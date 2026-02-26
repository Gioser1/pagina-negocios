import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CalendarScheduler = ({ isOpen, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Evitar scroll del body cuando el modal está abierto y notificar al Navbar
    useEffect(() => {
        const toggleEvent = new CustomEvent('calendarStateChange', { detail: { isOpen } });
        window.dispatchEvent(toggleEvent);

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Horarios disponibles
    const timeSlots = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
        "14:00", "14:30", "15:00", "15:30", "16:00"
    ];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isWeekend = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // 0 = domingo, 6 = sábado
    };

    const isPastDate = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isDateDisabled = (day) => {
        return isWeekend(day) || isPastDate(day);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleDateSelect = (day) => {
        if (!isDateDisabled(day)) {
            setSelectedDate(day);
            setSelectedTime(null);
        }
    };

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
            alert(`¡Cita agendada para ${fullDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las ${selectedTime}!`);
            onClose();
            setSelectedDate(null);
            setSelectedTime(null);
        }
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const daysArray = Array.from({ length: firstDay }, () => null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-3 sm:p-4 pt-24 sm:pt-20 md:pt-24"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-dark-100 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[82vh] sm:max-h-[90vh] relative flex flex-col mt-8 sm:mt-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar eliminado por petición del usuario */}

                {/* Contenido scrolleable del modal */}
                <div className="p-5 sm:p-8 pt-6 overflow-y-auto w-full flex-1 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 text-center pr-8 sm:pr-0">
                        Agenda una <span className="text-primary">llamada</span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Calendario */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            {/* Navegación de mes */}
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={handlePrevMonth}
                                    className="text-white hover:text-primary transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h3 className="text-white font-bold capitalize text-lg text-center flex-1">
                                    {monthName}
                                </h3>
                                <button
                                    onClick={handleNextMonth}
                                    className="text-white hover:text-primary transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Encabezados de días */}
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                                    <div key={day} className="text-center text-xs font-bold text-white/50 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Días del mes */}
                            <div className="grid grid-cols-7 gap-2">
                                {daysArray.map((day, index) => (
                                    <button
                                        key={index}
                                        onClick={() => day && handleDateSelect(day)}
                                        disabled={day && isDateDisabled(day)}
                                        className={`
                                            aspect-square rounded-lg font-bold text-sm transition-all
                                            ${day === null ? "invisible" : ""}
                                            ${day && isDateDisabled(day)
                                                ? "bg-white/5 text-white/30 cursor-not-allowed"
                                                : selectedDate === day
                                                    ? "bg-primary text-white ring-2 ring-primary"
                                                    : "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                                            }
                                        `}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>

                            {selectedDate && (
                                <div className="mt-6 p-4 bg-primary/20 border border-primary/30 rounded-lg">
                                    <p className="text-white text-sm font-medium">
                                        Día seleccionado:{" "}
                                        <span className="text-primary font-bold">
                                            {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Horarios */}
                        <div className="flex flex-col">
                            <h3 className="text-white font-bold mb-4">Selecciona una hora</h3>
                            {selectedDate ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`
                                                py-3 px-4 rounded-lg font-medium transition-all
                                                ${selectedTime === time
                                                    ? "bg-primary text-white ring-2 ring-primary"
                                                    : "bg-white/10 text-white hover:bg-white/20"
                                                }
                                            `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg mb-6 sm:mb-8 min-h-[100px]">
                                    <p className="text-white/50 text-center">
                                        Selecciona un día primero
                                    </p>
                                </div>
                            )}

                            {selectedTime && (
                                <div className="p-4 bg-primary/20 border border-primary/30 rounded-lg mb-6">
                                    <p className="text-white text-sm font-medium">
                                        Hora seleccionada: <span className="text-primary font-bold">{selectedTime}</span>
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-1/3 py-4 rounded-xl font-bold transition-all bg-white/10 text-white hover:bg-white/20 border border-white/10"
                                >
                                    Volver
                                </motion.button>
                                <motion.button
                                    onClick={handleConfirm}
                                    disabled={!selectedDate || !selectedTime}
                                    whileHover={selectedDate && selectedTime ? { scale: 1.05 } : {}}
                                    whileTap={selectedDate && selectedTime ? { scale: 0.95 } : {}}
                                    className={`
                                        w-full sm:w-2/3 py-4 rounded-xl font-bold transition-all
                                        ${selectedDate && selectedTime
                                            ? "bg-primary text-white hover:bg-emerald-500 cursor-pointer"
                                            : "bg-white/10 text-white/50 cursor-not-allowed"
                                        }
                                    `}
                                >
                                    Confirmar Cita
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CalendarScheduler;
