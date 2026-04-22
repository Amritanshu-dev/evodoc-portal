import React, { useState } from 'react';
import { 
  UserPlus, Calendar, List, LayoutDashboard, 
  Users, ClipboardList, Search, Bell, Menu, 
  ChevronRight, CheckCircle, Clock, XCircle 
} from 'lucide-react';

// --- UI COMPONENTS ---
const Card = ({ children, title, subtitle }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
    {(title || subtitle) && (
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

const Badge = ({ status }) => {
  const styles = {
    scheduled: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${styles[status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
      {status}
    </span>
  );
};

// --- PART 1: NURSE & RECEPTIONIST PORTAL ---
const NursePortal = () => {
  const [activeTab, setActiveTab] = useState('intake');

  return (
    <div className="space-y-6">
      <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-fit">
        <button onClick={() => setActiveTab('intake')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'intake' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Patient Intake</button>
        <button onClick={() => setActiveTab('registration')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'registration' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Registration</button>
        <button onClick={() => setActiveTab('view')} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'view' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Appointments List</button>
      </div>

      {activeTab === 'intake' && (
        <Card title="New Patient Intake" subtitle="Complete all fields for clinical documentation.">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600">Personal Information</h4>
                <input required className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Full Name" />
                <div className="flex gap-4">
                  <input required type="date" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <select className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>Gender: Male</option><option>Gender: Female</option><option>Gender: Other</option>
                  </select>
                </div>
                <input className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contact Number" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600">Medical History</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Blood Group" />
                  <input className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Chronic Conditions" />
                </div>
                <textarea className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="List Allergies & Medications..." rows="4" />
              </div>
            </div>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">Save Patient Record</button>
          </form>
        </Card>
      )}

      {activeTab === 'view' && (
        <Card title="Today's Appointments">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs font-black uppercase tracking-widest border-b">
                  <th className="pb-4 px-2">Patient</th>
                  <th className="pb-4 px-2">Doctor</th>
                  <th className="pb-4 px-2">Status</th>
                  <th className="pb-4 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "John Cooper", doc: "Dr. Aruni", status: "scheduled", time: "09:00 AM" },
                  { name: "Sarah Miller", doc: "Dr. Aruni", status: "completed", time: "10:30 AM" },
                  { name: "Prakriti S.", doc: "Dr. Shresth", status: "cancelled", time: "11:45 AM" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2 font-bold text-slate-700">{row.name}<br/><span className="text-xs font-normal text-slate-400">{row.time}</span></td>
                    <td className="py-4 px-2 text-slate-600">{row.doc}</td>
                    <td className="py-4 px-2"><Badge status={row.status} /></td>
                    <td className="py-4 px-2 text-right"><button className="text-indigo-600 font-bold text-sm hover:underline">Manage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

// --- PART 2: DOCTOR PORTAL ---
const DoctorPortal = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card title="Doctor Overview" subtitle="Welcome back, Dr. Smith.">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
              <p className="text-2xl font-black text-indigo-700">14</p>
              <p className="text-[10px] uppercase font-bold text-indigo-400">Total Visits</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
              <p className="text-2xl font-black text-emerald-700">08</p>
              <p className="text-[10px] uppercase font-bold text-emerald-400">Completed</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 text-center">
              <p className="text-2xl font-black text-orange-700">04</p>
              <p className="text-[10px] uppercase font-bold text-orange-400">Pending Notes</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-2xl font-black text-slate-700">02</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">Emergency</p>
            </div>
          </div>
        </Card>

        <Card title="Patient Clinical Details">
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-slate-900 text-white p-4 rounded-xl">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold">SJ</div>
              <div>
                <h4 className="font-bold">Sarah Jenkins</h4>
                <p className="text-xs text-slate-400">Female • 34 Years • ID: #EVO-9912</p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-600 block">Add Consultation Note</label>
              <textarea className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Type clinical findings here..." rows="6" />
              <div className="flex gap-2">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Save Note</button>
                <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-lg font-bold">Refer Patient</button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Next Appointments">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="group p-4 border border-slate-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">Patient 00{i}</p>
                  <p className="text-xs text-slate-500">General Checkup • 2:30 PM</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
              </div>
            ))}
          </div>
        </Card>
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-xl">
          <h4 className="font-bold mb-2">Internal Alert</h4>
          <p className="text-xs opacity-80 leading-relaxed">System-wide maintenance scheduled for midnight. Ensure all clinical records are synced before 11:00 PM.</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN WRAPPER ---
export default function App() {
  const [role, setRole] = useState('nurse');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">EvoDoc</h1>
            </div>
            <p className="text-slate-500 font-medium">Healthcare Startup Portal • Early Build Phase</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setRole('nurse')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${role === 'nurse' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Users className="w-4 h-4" /> Nurse View
            </button>
            <button 
              onClick={() => setRole('doctor')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${role === 'doctor' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ClipboardList className="w-4 h-4" /> Doctor View
            </button>
          </div>
        </header>

        <main className="animate-in fade-in duration-700">
          {role === 'nurse' ? <NursePortal /> : <DoctorPortal />}
        </main>

        <footer className="pt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Development Build v1.4.2 • Confidential Property of EvoDoc Inc.</p>
        </footer>
      </div>
    </div>
  );
}