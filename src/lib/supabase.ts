import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zduohwulyilqfngqumyt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdW9od3VseWlscWZuZ3F1bXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NzQ2OTIsImV4cCI6MjA0NjM1MDY5Mn0.5femTvuWDJjJbK7OMpJgBSQ8vTNuUc78B9pwDdaK67c';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadFile = async (file: File, path: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('admin-upload')
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = await supabase.storage
      .from('admin-upload')
      .getPublicUrl(filePath);

    return {
      ...data,
      publicUrl: urlData.publicUrl
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const getFileUrl = (path: string) => {
  const { data } = supabase.storage.from('admin-upload').getPublicUrl(path);
  if (!data.publicUrl) throw new Error('File not found');
  return data.publicUrl;
};