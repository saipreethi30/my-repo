import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { FeeRecords } from '@/entities';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FeeRecordsPage() {
  const [records, setRecords] = useState<FeeRecords[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const { items } = await BaseCrudService.getAll<FeeRecords>('feerecords');
      // Sort by transaction date (most recent first)
      const sorted = items.sort((a, b) => {
        const dateA = a.transactionDate ? new Date(a.transactionDate).getTime() : 0;
        const dateB = b.transactionDate ? new Date(b.transactionDate).getTime() : 0;
        return dateB - dateA;
      });
      setRecords(sorted);
    } catch (error) {
      console.error('Error loading fee records:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'text-accent-teal border-accent-teal/30 bg-accent-teal/10';
      case 'pending':
        return 'text-secondary border-secondary/30 bg-secondary/10';
      case 'overdue':
        return 'text-destructive border-destructive/30 bg-destructive/10';
      default:
        return 'text-foreground/60 border-primary/30 bg-primary/10';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'overdue':
        return AlertCircle;
      default:
        return CreditCard;
    }
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
                Fee Records
              </h1>
              <p className="font-paragraph text-xl text-foreground/70">
                Track your payment history and upcoming dues
              </p>
            </motion.div>
          </div>

          {/* Records Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[400px]">
              {isLoading ? null : records.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {records.map((record, index) => {
                    const StatusIcon = getStatusIcon(record.paymentStatus);
                    const statusColor = getStatusColor(record.paymentStatus);
                    const balance = (record.amountDue || 0) - (record.amountPaid || 0);
                    
                    return (
                      <motion.div
                        key={record._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] h-full">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                                {record.studentName || 'Student'}
                              </h3>
                              {record.transactionDate && (
                                <p className="font-mono text-sm text-foreground/60">
                                  {new Date(record.transactionDate).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </p>
                              )}
                            </div>
                            
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${statusColor}`}>
                              <StatusIcon className="w-5 h-5" />
                              <span className="font-paragraph font-semibold capitalize">
                                {record.paymentStatus || 'Unknown'}
                              </span>
                            </div>
                          </div>

                          {/* Payment Details */}
                          <div className="space-y-4 mb-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-background/50 rounded-xl border border-primary/10 p-4">
                                <span className="font-mono text-xs text-accent-teal uppercase block mb-2">
                                  Amount Due
                                </span>
                                <span className="font-mono text-2xl font-bold text-foreground">
                                  ₹{record.amountDue?.toLocaleString() || '0'}
                                </span>
                              </div>
                              
                              <div className="bg-background/50 rounded-xl border border-primary/10 p-4">
                                <span className="font-mono text-xs text-accent-purple uppercase block mb-2">
                                  Amount Paid
                                </span>
                                <span className="font-mono text-2xl font-bold text-foreground">
                                  ₹{record.amountPaid?.toLocaleString() || '0'}
                                </span>
                              </div>
                            </div>

                            {balance > 0 && (
                              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                                <span className="font-mono text-xs text-destructive uppercase block mb-2">
                                  Balance Due
                                </span>
                                <span className="font-mono text-3xl font-bold text-destructive">
                                  ₹{balance.toLocaleString()}
                                </span>
                              </div>
                            )}

                            {balance === 0 && record.paymentStatus?.toLowerCase() === 'paid' && (
                              <div className="bg-accent-teal/10 border border-accent-teal/30 rounded-xl p-4 text-center">
                                <CheckCircle className="w-8 h-8 text-accent-teal mx-auto mb-2" />
                                <span className="font-paragraph text-accent-teal font-semibold">
                                  Fully Paid
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Next Due Date */}
                          {record.nextDueDate && (
                            <div className="bg-background/50 rounded-xl border border-secondary/20 p-4">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-sm text-secondary uppercase">
                                  Next Due Date
                                </span>
                                <span className="font-paragraph text-lg font-semibold text-foreground">
                                  {new Date(record.nextDueDate).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
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
                  <CreditCard className="w-20 h-20 text-primary/30 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    No Fee Records
                  </h3>
                  <p className="font-paragraph text-foreground/60">
                    Payment records will appear here
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
