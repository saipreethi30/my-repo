import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Students, FeeRecords } from '@/entities';
import { User, Building2, CreditCard, Calendar, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ParentDashboardPage() {
  const [students, setStudents] = useState<Students[]>([]);
  const [feeRecords, setFeeRecords] = useState<FeeRecords[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsData, feeData] = await Promise.all([
        BaseCrudService.getAll<Students>('students'),
        BaseCrudService.getAll<FeeRecords>('feerecords')
      ]);
      setStudents(studentsData.items);
      setFeeRecords(feeData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentFeeRecord = (studentName: string) => {
    return feeRecords.find(f => f.studentName === studentName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="w-full pt-32 pb-16">
        <div className="max-w-[120rem] mx-auto px-6">
          {/* Page Header */}
          <div className="max-w-7xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent-teal to-secondary bg-clip-text text-transparent">
                Parent Dashboard
              </h1>
              <p className="font-paragraph text-xl text-foreground/70">
                Monitor your child's accommodation and payment status
              </p>
            </motion.div>
          </div>

          {/* Students Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[400px]">
              {isLoading ? null : students.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {students.map((student, index) => {
                    const feeRecord = getStudentFeeRecord(student.studentName || '');
                    const balance = feeRecord 
                      ? (feeRecord.amountDue || 0) - (feeRecord.amountPaid || 0)
                      : 0;
                    
                    return (
                      <motion.div
                        key={student._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] h-full">
                          {/* Student Header */}
                          <div className="flex items-start gap-6 mb-6 pb-6 border-b border-primary/20">
                            <div className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden bg-monospaced-background flex-shrink-0 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                              {student.profilePhoto ? (
                                <Image
                                  src={student.profilePhoto}
                                  alt={student.studentName || 'Student'}
                                  width={80}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User className="w-10 h-10 text-primary/50" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                                {student.studentName || 'Student'}
                              </h3>
                              {student.collegeName && (
                                <p className="font-paragraph text-foreground/70">
                                  {student.collegeName}
                                </p>
                              )}
                              {student.yearOfStudy && (
                                <p className="font-mono text-sm text-accent-teal mt-1">
                                  Year {student.yearOfStudy}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Accommodation Details */}
                          <div className="space-y-4 mb-6">
                            <div className="bg-background/50 rounded-xl border border-primary/10 p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <Building2 className="w-5 h-5 text-primary" />
                                <span className="font-mono text-sm text-primary uppercase">
                                  Accommodation
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="font-paragraph text-xs text-foreground/60 block mb-1">
                                    Room Number
                                  </span>
                                  <span className="font-mono text-xl font-bold text-foreground">
                                    {student.roomNumber || 'N/A'}
                                  </span>
                                </div>
                                {student.stayingSince && (
                                  <div>
                                    <span className="font-paragraph text-xs text-foreground/60 block mb-1">
                                      Staying Since
                                    </span>
                                    <span className="font-paragraph text-foreground">
                                      {new Date(student.stayingSince).toLocaleDateString('en-US', {
                                        month: 'short',
                                        year: 'numeric'
                                      })}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Parent Contact */}
                            {(student.parentName || student.parentContactInfo) && (
                              <div className="bg-background/50 rounded-xl border border-accent-teal/10 p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <User className="w-5 h-5 text-accent-teal" />
                                  <span className="font-mono text-sm text-accent-teal uppercase">
                                    Parent Contact
                                  </span>
                                </div>
                                {student.parentName && (
                                  <p className="font-paragraph text-foreground mb-2">
                                    {student.parentName}
                                  </p>
                                )}
                                {student.parentContactInfo && (
                                  <div className="flex items-center gap-2 text-foreground/70">
                                    <Phone className="w-4 h-4" />
                                    <span className="font-paragraph text-sm">
                                      {student.parentContactInfo}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Payment Status */}
                          {feeRecord && (
                            <div className="bg-background/50 rounded-xl border border-accent-purple/10 p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <CreditCard className="w-5 h-5 text-accent-purple" />
                                <span className="font-mono text-sm text-accent-purple uppercase">
                                  Payment Status
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <span className="font-paragraph text-xs text-foreground/60 block mb-1">
                                    Amount Due
                                  </span>
                                  <span className="font-mono text-xl font-bold text-foreground">
                                    ₹{feeRecord.amountDue?.toLocaleString() || '0'}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-paragraph text-xs text-foreground/60 block mb-1">
                                    Amount Paid
                                  </span>
                                  <span className="font-mono text-xl font-bold text-accent-teal">
                                    ₹{feeRecord.amountPaid?.toLocaleString() || '0'}
                                  </span>
                                </div>
                              </div>

                              {balance > 0 ? (
                                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                                  <div className="flex items-center justify-between">
                                    <span className="font-paragraph text-sm text-destructive">
                                      Balance Due
                                    </span>
                                    <span className="font-mono text-xl font-bold text-destructive">
                                      ₹{balance.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-accent-teal/10 border border-accent-teal/30 rounded-lg p-3 text-center">
                                  <span className="font-paragraph text-accent-teal font-semibold">
                                    ✓ Fully Paid
                                  </span>
                                </div>
                              )}

                              {feeRecord.nextDueDate && (
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/10">
                                  <div className="flex items-center gap-2 text-foreground/60">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-paragraph text-sm">Next Due</span>
                                  </div>
                                  <span className="font-paragraph font-semibold text-foreground">
                                    {new Date(feeRecord.nextDueDate).toLocaleDateString('en-US', {
                                      day: 'numeric',
                                      month: 'short'
                                    })}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <User className="w-20 h-20 text-primary/30 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    No Student Records
                  </h3>
                  <p className="font-paragraph text-foreground/60">
                    Student information will appear here
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
