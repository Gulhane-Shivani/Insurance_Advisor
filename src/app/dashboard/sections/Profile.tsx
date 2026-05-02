import React, { useState, useRef } from 'react';
import { User, Mail, Calendar, Camera, Shield, Bell, Lock, ShieldCheck, Edit3, Globe, Zap, ArrowLeft, Save, Eye, EyeOff, Smartphone, Laptop, SmartphoneIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfileProps {
  user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<'main' | 'edit' | 'password' | '2fa' | 'history' | 'apps'>('main');
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, label: 'Policy Renewals', desc: 'Email + Push', active: true },
    { id: 2, label: 'Premium Receipts', desc: 'Email only', active: true },
    { id: 3, label: 'Claim Updates', desc: 'SMS + Email + Push', active: true },
    { id: 4, label: 'Newsletter', desc: 'Weekly roundup', active: false },
  ]);

  const handleToggleNotification = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, active: !n.active } : n));
    toast.success('Preferences updated');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success('Profile photo updated');
      };
      reader.readAsDataURL(file);
    }
  };

  // View Components
  const SectionHeader = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <button onClick={() => setActiveView('main')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
        <p className="text-slate-500 text-sm font-medium">{desc}</p>
      </div>
    </div>
  );

  if (activeView === 'edit') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Edit Profile" desc="Update your personal identification details." />
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 max-w-4xl">
          <form onSubmit={(e) => { e.preventDefault(); toast.success('Profile updated'); setActiveView('main'); }} className="space-y-8">
            <div className="flex items-center gap-8 mb-10">
               <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden">
                     {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : <span className="text-3xl font-black text-blue-600">{user?.full_name?.charAt(0) || 'U'}</span>}
                  </div>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg"><Camera className="w-3.5 h-3.5" /></button>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
               </div>
               <div><h3 className="text-lg font-black text-slate-900">Profile Picture</h3><p className="text-xs text-slate-400 font-medium mt-1">PNG or JPG, max 5MB</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Full Name', 'Email Address', 'Mobile Number', 'Date of Birth'].map((label, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                  <input type="text" placeholder={label} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50" />
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-4 border-t border-slate-50">
               <button type="button" onClick={() => setActiveView('main')} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Discard</button>
               <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (activeView === 'password') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Change Password" desc="Ensure your account is using a long, random password." />
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 max-w-2xl">
           <form onSubmit={(e) => { e.preventDefault(); toast.success('Password updated'); setActiveView('main'); }} className="space-y-6">
              {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                <div key={i} className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                   <div className="relative">
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50" />
                      {i === 0 && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
                   </div>
                </div>
              ))}
              <div className="flex gap-4 pt-4">
                 <button type="button" onClick={() => setActiveView('main')} className="flex-1 py-4 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                 <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Update Password</button>
              </div>
           </form>
        </div>
      </div>
    );
  }

  if (activeView === '2fa') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Two-Factor Authentication" desc="Add an extra layer of security to your account." />
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm p-10 max-w-2xl text-center">
           <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-6"><Smartphone className="w-10 h-10" /></div>
           <h3 className="text-xl font-black text-slate-900 mb-2">Authenticator App</h3>
           <p className="text-slate-500 text-sm mb-8 leading-relaxed">Use an app like Google Authenticator or Microsoft Authenticator to generate verification codes.</p>
           <button onClick={() => toast.success('2FA Setup initiated')} className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">Enable 2FA</button>
        </div>
      </div>
    );
  }

  if (activeView === 'history') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Login History" desc="Monitor and manage your active account sessions." />
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-50 font-black text-[10px] uppercase tracking-widest text-slate-400 grid grid-cols-3">
              <span>Device</span><span>Location</span><span className="text-right">Action</span>
           </div>
           <div className="divide-y divide-slate-50">
              {[
                { device: 'MacBook Pro', info: 'Chrome • Mumbai, IN', icon: Laptop, current: true },
                { device: 'iPhone 15 Pro', info: 'App • Mumbai, IN', icon: SmartphoneIcon, current: false },
                { device: 'Windows Desktop', info: 'Firefox • Noida, IN', icon: Laptop, current: false },
              ].map((session, i) => (
                <div key={i} className="p-8 grid grid-cols-3 items-center hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500"><session.icon className="w-5 h-5" /></div>
                      <div><p className="text-sm font-black text-slate-900">{session.device}</p>{session.current && <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Current Session</span>}</div>
                   </div>
                   <span className="text-xs font-bold text-slate-500">{session.info}</span>
                   <div className="text-right"><button onClick={() => toast.success('Session terminated')} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">{session.current ? 'Logout' : 'Revoke'}</button></div>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  if (activeView === 'apps') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Linked Applications" desc="Manage third-party services connected to your account." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { name: 'Google Account', email: 'john.doe@gmail.com', icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
             { name: 'Apple ID', email: 'j.doe@icloud.com', icon: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }
           ].map((app, i) => (
             <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-5">
                   <img src={app.icon} className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all" />
                   <div><h4 className="text-sm font-black text-slate-900">{app.name}</h4><p className="text-xs font-bold text-slate-400">{app.email}</p></div>
                </div>
                <button onClick={() => toast.success(`Unlinked ${app.name}`)} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">Disconnect</button>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Management</span>
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Overview</h1>
           <p className="text-slate-500 font-medium mt-1 text-sm">Update your personal information and security settings.</p>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => setActiveView('edit')} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"><Edit3 className="w-3.5 h-3.5" /> Edit Profile</button>
           <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /><span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Verified</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-slate-900 p-10 text-white relative overflow-hidden flex flex-col items-center justify-center border-r border-slate-800">
                 <div className="relative z-10 mb-6">
                    <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md p-1 border border-white/20 shadow-2xl overflow-hidden">
                       <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">
                          {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : <span className="text-5xl font-black">{user?.full_name?.charAt(0) || user?.name?.charAt(0) || 'U'}</span>}
                       </div>
                    </div>
                    <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform"><Camera className="w-4 h-4" /></button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                 </div>
                 <h2 className="relative z-10 text-2xl font-black mb-1 text-center">{user?.full_name || user?.name || 'John Doe'}</h2>
                 <p className="relative z-10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Platinum Client</p>
                 <div className="relative z-10 mt-10 grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5"><p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Policies</p><p className="text-xl font-black">03</p></div>
                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5"><p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Tenure</p><p className="text-xl font-black">4y</p></div>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              </div>

              <div className="md:w-2/3 p-10 bg-white">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User className="w-3.5 h-3.5" /> Identity Details</h3>
                       <div className="space-y-4">
                          <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Legal Name</p><p className="text-sm font-bold text-slate-900">{user?.full_name || user?.name || 'John Doe'}</p></div>
                          <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p><p className="text-sm font-bold text-slate-900">15 June 1985</p></div>
                          <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Aadhar / Tax ID</p><p className="text-sm font-bold text-slate-900">•••• •••• 9012</p></div>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Contact Channels</h3>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between group"><div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p><p className="text-sm font-bold text-slate-900">{user?.email || 'john@example.com'}</p></div><span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-lg">Primary</span></div>
                          <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Mobile</p><p className="text-sm font-bold text-slate-900">+91 98765 43210</p></div>
                          <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Region</p><p className="text-sm font-bold text-slate-900">Noida, UP (IN)</p></div>
                       </div>
                    </div>
                 </div>
                 <div className="mt-10 pt-10 border-t border-slate-50 flex flex-wrap gap-4">
                    <button onClick={() => toast('Language settings coming soon')} className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"><Globe className="w-3.5 h-3.5" /> Language: English</button>
                    <button onClick={() => toast('Timezone sync active')} className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"><Zap className="w-3.5 h-3.5" /> Timezone: UTC+5:30</button>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-8">
              <h3 className="text-sm font-black text-slate-900 mb-8 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-600" /> Security Infrastructure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { id: 'password', label: 'Password', desc: 'Last updated 3m ago', icon: Lock, status: 'Update' },
                   { id: '2fa', label: 'Two-Factor', desc: 'SMS + Authenticator', icon: ShieldCheck, status: 'Manage' },
                   { id: 'history', label: 'Login History', desc: '3 active sessions', icon: Calendar, status: 'View' },
                   { id: 'apps', label: 'Linked Apps', desc: 'Google, Apple', icon: Globe, status: 'Edit' },
                 ].map((item, i) => (
                   <div key={i} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-blue-100 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm"><item.icon className="w-5 h-5" /></div>
                         <div><p className="text-xs font-bold text-slate-900">{item.label}</p><p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p></div>
                      </div>
                      <button onClick={() => setActiveView(item.id as any)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">{item.status}</button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-200/50">
              <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2"><Bell className="w-5 h-5 text-purple-600" /> Notification Matrix</h3>
              <div className="space-y-4">
                 {notifications.map((item) => (
                   <div key={item.id} className="flex items-center justify-between">
                      <div><p className="text-xs font-bold text-slate-700">{item.label}</p><p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p></div>
                      <div onClick={() => handleToggleNotification(item.id)} className={`w-10 h-5 rounded-full p-1 transition-colors cursor-pointer ${item.active ? 'bg-blue-600' : 'bg-slate-300'}`}><div className={`w-3 h-3 bg-white rounded-full transition-transform ${item.active ? 'translate-x-5' : ''}`}></div></div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-7 border-b border-slate-50 flex justify-between items-center"><h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-600" /> Nominee</h3><button onClick={() => toast('Nominee update requested')} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Update</button></div>
              <div className="p-7">
                 <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-black">J</div><div><h4 className="text-sm font-black text-slate-900">Jane Doe</h4><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Relationship: Spouse</p></div></div>
                 <div className="space-y-3"><div className="flex justify-between text-[11px] font-bold"><span className="text-slate-400">Share %</span><span className="text-slate-900 text-right">100%</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-slate-400">ID Status</span><span className="text-emerald-600 text-right uppercase tracking-widest text-[9px]">Verified</span></div></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
