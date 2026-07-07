'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/mars-space/Sidebar';
import Header from '@/components/mars-space/Header';
import StudentDashboard from '@/components/mars-space/StudentDashboard';
import TeacherDashboard from '@/components/mars-space/TeacherDashboard';
import AdminDashboard from '@/components/mars-space/AdminDashboard';
import { AnimatePresence } from 'motion/react';

export default function MarsSpaceDashboard() {
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex">
      <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-64 p-8 pt-6">
        <Header role={role} setRole={setRole} />

        <AnimatePresence mode="wait">
          {role === 'student' && <StudentDashboard key="student" />}
          {role === 'teacher' && <TeacherDashboard key="teacher" />}
          {role === 'admin' && <AdminDashboard key="admin" />}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-5 select-none">
        <h1 className="text-[12rem] font-black italic tracking-tighter">MARS</h1>
      </div>
    </div>
  );
}
