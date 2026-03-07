import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

function ProfilePageContent() {
  const { member, actions } = useMember();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="w-full pt-32 pb-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Page Header */}
              <div className="mb-12">
                <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent-teal to-secondary bg-clip-text text-transparent">
                  Profile
                </h1>
                <p className="font-paragraph text-xl text-foreground/70">
                  Manage your account information
                </p>
              </div>

              {/* Profile Card */}
              <div className="bg-monospaced-background/70 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 md:p-12 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
                {/* Profile Photo & Name */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 pb-8 border-b border-primary/20">
                  <div className="w-32 h-32 rounded-full border-4 border-primary shadow-[0_0_20px_rgba(0,255,255,0.5)] overflow-hidden bg-monospaced-background flex-shrink-0">
                    {member?.profile?.photo?.url ? (
                      <Image src={member.profile.photo.url} alt={member.profile.nickname || 'Profile'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-heading text-4xl font-bold mb-2 text-foreground">
                      {member?.profile?.nickname || 
                       member?.contact?.firstName || 
                       'User'}
                    </h2>
                    {member?.profile?.title && (
                      <p className="font-paragraph text-lg text-foreground/70">
                        {member.profile.title}
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                    Account Details
                  </h3>

                  {/* Email */}
                  {member?.loginEmail && (
                    <div className="bg-background/50 rounded-xl border border-primary/10 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <span className="font-mono text-sm text-primary uppercase block mb-2">
                            Email Address
                          </span>
                          <span className="font-paragraph text-lg text-foreground">
                            {member.loginEmail}
                          </span>
                          {member.loginEmailVerified && (
                            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-accent-teal/20 border border-accent-teal/30 text-accent-teal text-xs font-semibold">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Name */}
                  {(member?.contact?.firstName || member?.contact?.lastName) && (
                    <div className="bg-background/50 rounded-xl border border-primary/10 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-teal/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-accent-teal" />
                        </div>
                        <div className="flex-1">
                          <span className="font-mono text-sm text-accent-teal uppercase block mb-2">
                            Full Name
                          </span>
                          <span className="font-paragraph text-lg text-foreground">
                            {[member.contact.firstName, member.contact.lastName]
                              .filter(Boolean)
                              .join(' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Member Since */}
                  {member?._createdDate && (
                    <div className="bg-background/50 rounded-xl border border-primary/10 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-accent-purple" />
                        </div>
                        <div className="flex-1">
                          <span className="font-mono text-sm text-accent-purple uppercase block mb-2">
                            Member Since
                          </span>
                          <span className="font-paragraph text-lg text-foreground">
                            {new Date(member._createdDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Last Login */}
                  {member?.lastLoginDate && (
                    <div className="bg-background/50 rounded-xl border border-primary/10 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <span className="font-mono text-sm text-secondary uppercase block mb-2">
                            Last Login
                          </span>
                          <span className="font-paragraph text-lg text-foreground">
                            {new Date(member.lastLoginDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sign Out Button */}
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <button
                    onClick={actions.logout}
                    className="w-full md:w-auto px-8 py-4 rounded-xl border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-paragraph font-semibold transition-all flex items-center justify-center gap-3"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to view your profile">
      <ProfilePageContent />
    </MemberProtectedRoute>
  );
}
