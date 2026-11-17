import React, { useState } from 'react';
import { X, Lock, Mail, User, LogIn, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (role: 'admin' | 'client') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        try {
            if (isRegister) {
                // Registro de cliente
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName, role: 'client' },
                    },
                });
                if (error) throw error;

                if (data.user) {
                    alert('¡Registro exitoso! Ya puedes iniciar sesión.');
                    setIsRegister(false);
                }
            } else {
                // Inicio de sesión
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                if (data.user) {
                    // Consultamos el rol en la tabla profiles
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', data.user.id)
                        .single();

                    const userRole = (profile?.role as 'admin' | 'client') || 'client';
                    onLoginSuccess(userRole);
                    onClose();
                }
            }
        } catch (err: any) {
            setErrorMsg(err.message || 'Ocurrió un error al procesar la solicitud.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="relative bg-white rounded-3xl max-w-md w-full border border-[#EBE3D5] shadow-2xl p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F2] text-[#3B241C] hover:bg-[#EBE3D5] transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="text-center mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#B58A52]">
                        Acceso Royal Raymi
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#3B241C] mt-1">
                        {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </h2>
                </div>

                {errorMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                        <div>
                            <label className="block text-xs font-semibold text-[#3B241C] mb-1">Nombre Completo</label>
                            <div className="relative">
                                <User className="w-4 h-4 text-[#8C7A70] absolute left-3 top-3" />
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Tu nombre o empresa"
                                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#EBE3D5] text-sm text-[#3B241C] bg-[#FAF7F2] focus:outline-none focus:border-[#3B241C]"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-[#3B241C] mb-1">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-[#8C7A70] absolute left-3 top-3" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ejemplo@correo.com"
                                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#EBE3D5] text-sm text-[#3B241C] bg-[#FAF7F2] focus:outline-none focus:border-[#3B241C]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#3B241C] mb-1">Contraseña</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-[#8C7A70] absolute left-3 top-3" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#EBE3D5] text-sm text-[#3B241C] bg-[#FAF7F2] focus:outline-none focus:border-[#3B241C]"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl bg-[#3B241C] hover:bg-[#B58A52] text-[#FAF7F2] font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <LogIn className="w-4 h-4" />
                        <span>{loading ? 'Procesando...' : isRegister ? 'Registrarse' : 'Ingresar'}</span>
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-[#F2ECE1] pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setErrorMsg(null);
                        }}
                        className="text-xs text-[#8C7A70] hover:text-[#3B241C] font-medium"
                    >
                        {isRegister
                            ? '¿Ya tienes una cuenta? Inicia sesión'
                            : '¿No tienes cuenta comercial? Regístrate aquí'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
