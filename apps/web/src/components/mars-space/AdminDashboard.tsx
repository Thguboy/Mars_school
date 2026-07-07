'use client';

import React from 'react';
import { User, BookOpen, ShoppingBag, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="text-blue-500" /> Platforma Analitikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-end justify-between gap-2 px-4 pb-4">
              {[45, 65, 30, 85, 55, 90, 70, 40, 80, 60, 95, 75].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className={`w-full rounded-t-lg ${i % 2 === 0 ? 'bg-[#FF6B35]' : 'bg-[#7209B7]'}`}
                  />
                  <span className="text-[10px] text-slate-400 font-bold">
                    {
                      [
                        'Yan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Iyun',
                        'Iyul',
                        'Avg',
                        'Sen',
                        'Okt',
                        'Noy',
                        'Dek',
                      ][i]
                    }
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Tezkor amallar</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-2xl border-slate-100 hover:border-[#FF6B35] hover:bg-[#FF6B35]/5"
              >
                <User size={24} className="text-[#FF6B35]" />
                <span className="text-xs">Yangi talaba</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-2xl border-slate-100 hover:border-[#7209B7] hover:bg-[#7209B7]/5"
              >
                <BookOpen size={24} className="text-[#7209B7]" />
                <span className="text-xs">Yangi kurs</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-2xl border-slate-100 hover:border-[#2EC4B6] hover:bg-[#2EC4B6]/5"
              >
                <ShoppingBag size={24} className="text-[#2EC4B6]" />
                <span className="text-xs">Shop item</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 rounded-2xl border-slate-100 hover:border-[#FFB703] hover:bg-[#FFB703]/5"
              >
                <Settings size={24} className="text-[#FFB703]" />
                <span className="text-xs">Sozlamalar</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Space Shop Boshqaruvi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Jami mahsulotlar</span>
                  <span className="font-bold">45 ta</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Sotilgan (bu oy)</span>
                  <span className="font-bold">128 ta</span>
                </div>
                <Separator className="bg-slate-100" />
                <div className="text-center pt-2">
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90">
                    Inventarizatsiya
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-sm font-bold">Live Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { user: 'Jasur', action: 'Space Shopdan Hoodie sotib oldi', time: '2 daq avval' },
                {
                  user: 'Teacher Ali',
                  action: "FE-201 guruhiga dars qo'shdi",
                  time: '12 daq avval',
                },
                {
                  user: 'Admin',
                  action: 'Yangi "Cyber Security" kursi yaratildi',
                  time: '45 daq avval',
                },
                { user: 'Nodira', action: "XP reytingida 1-o'ringa chiqdi", time: '1 soat avval' },
              ].map((log, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="text-xs font-bold text-slate-800">{log.user}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{log.action}</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter font-bold">
                    {log.time}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-xs text-slate-400 py-3 rounded-none">
              Show full log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
