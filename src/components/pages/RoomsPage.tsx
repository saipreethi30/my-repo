import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Rooms, Students } from '@/entities';
import { Bed, Users, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [students, setStudents] = useState<Students[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [roomsData, studentsData] = await Promise.all([
        BaseCrudService.getAll<Rooms>('rooms'),
        BaseCrudService.getAll<Students>('students')
      ]);
      setRooms(roomsData.items);
      setStudents(studentsData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentsInRoom = (roomNumber: string) => {
    return students.filter(s => s.roomNumber === roomNumber);
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
                Room Information
              </h1>
              <p className="font-paragraph text-xl text-foreground/70">
                View room details and occupant information
              </p>
            </motion.div>
          </div>

          {/* Rooms Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="min-h-[400px]">
              {isLoading ? null : rooms.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {rooms.map((room, index) => {
                    const roomStudents = getStudentsInRoom(room.roomNumber || '');
                    const occupancy = roomStudents.length;
                    const totalBeds = room.totalBeds || 0;
                    
                    return (
                      <motion.div
                        key={room._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                          {/* Room Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="font-heading text-3xl font-bold mb-2 text-foreground">
                                Room {room.roomNumber || 'N/A'}
                              </h3>
                              {room.hostelName && (
                                <div className="flex items-center gap-2 text-accent-teal">
                                  <Building2 className="w-5 h-5" />
                                  <span className="font-paragraph text-lg">{room.hostelName}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <div className="bg-primary/20 border border-primary/30 rounded-xl px-4 py-2 mb-2">
                                <span className="font-mono text-2xl font-bold text-primary">
                                  {occupancy}/{totalBeds}
                                </span>
                              </div>
                              <span className="font-paragraph text-sm text-foreground/60">Occupancy</span>
                            </div>
                          </div>

                          {/* Room Details */}
                          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background/50 rounded-xl border border-primary/10">
                            {room.roomType && (
                              <div>
                                <span className="font-mono text-xs text-accent-purple uppercase">Type</span>
                                <p className="font-paragraph text-foreground">{room.roomType}</p>
                              </div>
                            )}
                            {room.floorLevel !== undefined && (
                              <div>
                                <span className="font-mono text-xs text-accent-teal uppercase">Floor</span>
                                <p className="font-paragraph text-foreground">Level {room.floorLevel}</p>
                              </div>
                            )}
                          </div>

                          {room.layoutDescription && (
                            <p className="font-paragraph text-sm text-foreground/70 mb-6 p-4 bg-background/30 rounded-xl border border-primary/10">
                              {room.layoutDescription}
                            </p>
                          )}

                          {/* Occupants */}
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <Users className="w-5 h-5 text-primary" />
                              <h4 className="font-heading text-xl font-semibold text-foreground">
                                Occupants
                              </h4>
                            </div>

                            {roomStudents.length > 0 ? (
                              <div className="space-y-3">
                                {roomStudents.map((student) => (
                                  <div
                                    key={student._id}
                                    className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border border-primary/10 hover:border-primary/30 transition-all"
                                  >
                                    <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden bg-monospaced-background flex-shrink-0">
                                      {student.profilePhoto ? (
                                        <Image
                                          src={student.profilePhoto}
                                          alt={student.studentName || 'Student'}
                                          width={48}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                          <Users className="w-6 h-6 text-primary/50" />
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-paragraph font-semibold text-foreground truncate">
                                        {student.studentName || 'Unknown'}
                                      </h5>
                                      {student.collegeName && (
                                        <p className="font-paragraph text-sm text-foreground/60 truncate">
                                          {student.collegeName}
                                        </p>
                                      )}
                                    </div>

                                    {student.stayingSince && (
                                      <div className="text-right flex-shrink-0">
                                        <span className="font-mono text-xs text-accent-teal">Since</span>
                                        <p className="font-paragraph text-sm text-foreground">
                                          {new Date(student.stayingSince).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                          })}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 bg-background/30 rounded-xl border border-primary/10">
                                <Bed className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                                <p className="font-paragraph text-foreground/60">
                                  No occupants currently
                                </p>
                              </div>
                            )}
                          </div>
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
                  <Bed className="w-20 h-20 text-primary/30 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    No Rooms Available
                  </h3>
                  <p className="font-paragraph text-foreground/60">
                    Room information will appear here
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
