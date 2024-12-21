import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, MoreVertical, Edit, Trash2, 
  Mail, Phone, User, Award, Check
} from 'lucide-react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  useEffect(() => {
    fetchStudents();
  }, [selectedGrade]);

  const fetchStudents = async () => {
    try {
      let q = collection(db, 'users');
      if (selectedGrade !== 'all') {
        q = query(q, where('grade', '==', selectedGrade));
      }
      
      const snapshot = await getDocs(q);
      const studentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setStudents(studentData);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedStudents.length) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedStudents.length} selected student(s)?`)) {
      try {
        await Promise.all(
          selectedStudents.map(studentId => 
            deleteDoc(doc(db, 'users', studentId))
          )
        );
        
        setStudents(students.filter(student => !selectedStudents.includes(student.id)));
        setSelectedStudents([]);
        toast.success('Selected students deleted successfully');
      } catch (error) {
        console.error('Error deleting students:', error);
        toast.error('Failed to delete students');
      }
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full md:w-64"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Grades</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>

          {selectedStudents.length > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="btn-primary bg-red-500 hover:bg-red-600"
            >
              <Trash2 size={20} className="mr-2" />
              Delete Selected ({selectedStudents.length})
            </button>
          )}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={toggleAllStudents}
                      className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold text-gray-300">Student</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Grade</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`hover:bg-white/5 transition-colors ${
                      selectedStudents.includes(student.id) ? 'bg-purple-500/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                          className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                        />
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <User size={20} className="text-purple-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{student.fullName}</p>
                          <p className="text-gray-400 text-sm">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Mail size={16} />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Phone size={16} />
                          <span>{student.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-500">
                        Grade {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(student.completedQuizzes?.length || 0) * 10}%` }}
                          />
                        </div>
                        <span className="text-gray-300 text-sm">
                          {(student.completedQuizzes?.length || 0) * 10}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {/* Handle edit */}}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => toggleStudentSelection(student.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentList;