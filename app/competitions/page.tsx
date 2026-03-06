'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Trophy, Users, Globe, ChevronDown, ChevronUp, TrendingUp, Award, Target, Zap } from 'lucide-react';

interface RoundData {
  name: string;
  deadline: string;
  totalParticipants: number;
  cleared: number;
  clearancePercentage: number;
}

interface Competition {
  id: string;
  name: string;
  totalRegistrations: number;
  lastDate: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  registrationFee: string;
  outcome: string;
  departmentBreakdown: { [key: string]: number };
  rounds: RoundData[];
  description: string;
}

const competitions: Competition[] = [
  {
    id: '1',
    name: 'National Hackathon - Code Innovation Summit',
    totalRegistrations: 450,
    lastDate: '2024-04-30',
    mode: 'Hybrid',
    registrationFee: '₹500 per team',
    outcome: 'Winner: IIT Delhi, Runner-up: NIT Trichy, Prize Pool: ₹10 Lakhs',
    departmentBreakdown: {
      'CSE': 180,
      'IT': 120,
      'Core Engineering': 85,
      'Electronics': 65,
    },
    rounds: [
      { name: 'Round 1 - Ideation', deadline: '2024-03-15', totalParticipants: 450, cleared: 180, clearancePercentage: 40 },
      { name: 'Round 2 - Prototype Development', deadline: '2024-04-01', totalParticipants: 180, cleared: 60, clearancePercentage: 33 },
      { name: 'Round 3 - Final Presentation', deadline: '2024-04-30', totalParticipants: 60, cleared: 10, clearancePercentage: 17 },
    ],
    description: '48-hour hackathon showcasing innovative software and hardware solutions for real-world problems.',
  },
  {
    id: '2',
    name: 'Engineering Design Challenge 2024',
    totalRegistrations: 320,
    lastDate: '2024-05-15',
    mode: 'Offline',
    registrationFee: '₹1000 per team',
    outcome: 'Excellence Award: Team Phoenix, Best Innovation: Team Nexus',
    departmentBreakdown: {
      'Mechanical Engineering': 120,
      'Civil Engineering': 90,
      'Core Engineering': 70,
      'Electrical': 40,
    },
    rounds: [
      { name: 'Round 1 - Design Submission', deadline: '2024-04-15', totalParticipants: 320, cleared: 128, clearancePercentage: 40 },
      { name: 'Round 2 - Model Evaluation', deadline: '2024-05-01', totalParticipants: 128, cleared: 32, clearancePercentage: 25 },
      { name: 'Round 3 - Presentation & Viva', deadline: '2024-05-15', totalParticipants: 32, cleared: 8, clearancePercentage: 25 },
    ],
    description: 'Design and develop innovative engineering solutions addressing sustainability challenges.',
  },
  {
    id: '3',
    name: 'AI & ML Challenge - Smart City Solutions',
    totalRegistrations: 280,
    lastDate: '2024-06-10',
    mode: 'Online',
    registrationFee: 'Free',
    outcome: 'Top 3 teams awarded prizes worth ₹5 Lakhs + Internship opportunities',
    departmentBreakdown: {
      'CSE': 140,
      'IT': 85,
      'Data Science': 55,
    },
    rounds: [
      { name: 'Round 1 - Qualification', deadline: '2024-05-01', totalParticipants: 280, cleared: 112, clearancePercentage: 40 },
      { name: 'Round 2 - Code Submission', deadline: '2024-05-25', totalParticipants: 112, cleared: 28, clearancePercentage: 25 },
      { name: 'Round 3 - Presentation', deadline: '2024-06-10', totalParticipants: 28, cleared: 7, clearancePercentage: 25 },
    ],
    description: 'Develop machine learning models to solve smart city problems using provided datasets.',
  },
  {
    id: '4',
    name: 'Robotics Competition - Bot Wars',
    totalRegistrations: 200,
    lastDate: '2024-07-20',
    mode: 'Offline',
    registrationFee: '₹1500 per team',
    outcome: 'Champion: Team Autobot, Runner-up: Team Techno, Total Prize Pool: ₹8 Lakhs',
    departmentBreakdown: {
      'Electronics & Communication': 80,
      'Mechanical Engineering': 60,
      'Core Engineering': 40,
      'CSE': 20,
    },
    rounds: [
      { name: 'Round 1 - Design Review', deadline: '2024-06-15', totalParticipants: 200, cleared: 80, clearancePercentage: 40 },
      { name: 'Round 2 - Preliminary Round', deadline: '2024-07-05', totalParticipants: 80, cleared: 20, clearancePercentage: 25 },
      { name: 'Round 3 - Finals', deadline: '2024-07-20', totalParticipants: 20, cleared: 5, clearancePercentage: 25 },
    ],
    description: 'Build autonomous robots to compete in various tasks including obstacle navigation and object recognition.',
  },
  {
    id: '5',
    name: 'Web Development Showcase',
    totalRegistrations: 250,
    lastDate: '2024-08-05',
    mode: 'Hybrid',
    registrationFee: '₹300 per participant',
    outcome: 'Best Website: E-Commerce Platform by Team WebMasters, Prize Pool: ₹3 Lakhs',
    departmentBreakdown: {
      'CSE': 120,
      'IT': 95,
      'BCA': 35,
    },
    rounds: [
      { name: 'Round 1 - Project Submission', deadline: '2024-07-10', totalParticipants: 250, cleared: 100, clearancePercentage: 40 },
      { name: 'Round 2 - Code Review', deadline: '2024-07-25', totalParticipants: 100, cleared: 25, clearancePercentage: 25 },
      { name: 'Round 3 - Live Demo', deadline: '2024-08-05', totalParticipants: 25, cleared: 6, clearancePercentage: 24 },
    ],
    description: 'Showcase innovative web applications using latest technologies and frameworks.',
  },
  {
    id: '6',
    name: 'Cyber Security Challenge - Bug Bounty',
    totalRegistrations: 180,
    lastDate: '2024-08-15',
    mode: 'Online',
    registrationFee: 'Free',
    outcome: 'Top Hacker: Security Expert Award, Total Bug Bounty: ₹4 Lakhs',
    departmentBreakdown: {
      'CSE': 90,
      'IT': 60,
      'Cyber Security': 30,
    },
    rounds: [
      { name: 'Round 1 - Vulnerability Identification', deadline: '2024-07-20', totalParticipants: 180, cleared: 72, clearancePercentage: 40 },
      { name: 'Round 2 - Exploit Development', deadline: '2024-08-05', totalParticipants: 72, cleared: 18, clearancePercentage: 25 },
      { name: 'Round 3 - Final Submission', deadline: '2024-08-15', totalParticipants: 18, cleared: 5, clearancePercentage: 28 },
    ],
    description: 'Identify security vulnerabilities and develop exploits for provided applications.',
  },
];

const modeColors = {
  Online: 'bg-blue-50 text-blue-700 border-blue-200/50',
  Offline: 'bg-green-50 text-green-700 border-green-200/50',
  Hybrid: 'bg-purple-50 text-purple-700 border-purple-200/50',
};

export default function Competitions() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalRegistrations = competitions.reduce((sum, c) => sum + c.totalRegistrations, 0);
  const totalCompetitions = competitions.length;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Competitions & Hackathons
              </h2>
              <p className="text-muted-foreground text-sm">
                Engineering Cluster - Technical Competitions & Challenges
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50/95 border border-blue-200">
                <Trophy className="w-8 h-8 text-blue-600 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Total Competitions</p>
                <p className="text-3xl font-bold text-blue-600">{totalCompetitions}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-50/95 border border-orange-200">
                <Users className="w-8 h-8 text-orange-600 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Total Registrations</p>
                <p className="text-3xl font-bold text-orange-600">{totalRegistrations.toLocaleString()}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-50/95 border border-green-200">
                <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Avg. Participants</p>
                <p className="text-3xl font-bold text-green-600">{Math.floor(totalRegistrations / totalCompetitions)}</p>
              </Card>
            </div>

            {/* Competitions List */}
            <div className="space-y-4">
              {competitions.map((comp) => (
                <Card 
                  key={comp.id}
                  className="p-6 bg-gradient-to-r from-card to-card/95 border border-border/50 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setExpandedId(expandedId === comp.id ? null : comp.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-foreground">{comp.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${modeColors[comp.mode]}`}>
                          {comp.mode}
                        </span>
                      </div>

                      {/* Summary Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-secondary rounded">
                          <p className="text-xs text-muted-foreground font-semibold">Total Registrations</p>
                          <p className="text-2xl font-bold text-foreground">{comp.totalRegistrations}</p>
                        </div>
                        <div className="p-3 bg-secondary rounded">
                          <p className="text-xs text-muted-foreground font-semibold">Registration Fee</p>
                          <p className="text-sm font-bold text-foreground">{comp.registrationFee}</p>
                        </div>
                        <div className="p-3 bg-secondary rounded">
                          <p className="text-xs text-muted-foreground font-semibold">Last Date</p>
                          <p className="text-sm font-bold text-foreground">
                            {new Date(comp.lastDate).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <div className="p-3 bg-secondary rounded">
                          <p className="text-xs text-muted-foreground font-semibold">Departments</p>
                          <p className="text-sm font-bold text-foreground">
                            {Object.keys(comp.departmentBreakdown).length} depts
                          </p>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {expandedId === comp.id && (
                        <div className="mt-6 pt-6 border-t border-border/50 space-y-6">
                          {/* Description */}
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-2">About Competition</p>
                            <p className="text-sm text-muted-foreground">{comp.description}</p>
                          </div>

                          {/* Outcome */}
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm font-semibold text-foreground mb-1">Outcome</p>
                            <p className="text-sm text-foreground">{comp.outcome}</p>
                          </div>

                          {/* Department Breakdown */}
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Participation by Department
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Object.entries(comp.departmentBreakdown)
                                .sort(([, a], [, b]) => b - a)
                                .map(([dept, count], idx) => {
                                  const percentage = ((count / comp.totalRegistrations) * 100).toFixed(1);
                                  const colors = ['bg-blue-100 border-blue-300', 'bg-purple-100 border-purple-300', 'bg-indigo-100 border-indigo-300', 'bg-cyan-100 border-cyan-300'];
                                  const barColors = ['bg-blue-600', 'bg-purple-600', 'bg-indigo-600', 'bg-cyan-600'];
                                  return (
                                    <div key={dept} className={`p-4 ${colors[idx % colors.length]} rounded-lg border-2 hover:shadow-md transition-all`}>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-foreground">{dept}</span>
                                        <span className="text-lg font-bold text-primary">{percentage}%</span>
                                      </div>
                                      <div className="w-full bg-white rounded-full h-3 border">
                                        <div 
                                          className={`${barColors[idx % barColors.length]} h-3 rounded-full transition-all` }
                                          style={{ width: `${percentage}%` }}
                                        ></div>
                                      </div>
                                      <p className="text-xs text-foreground font-semibold mt-2">{count} / {comp.totalRegistrations} participants</p>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          {/* Round Tracking */}
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Round-wise Performance
                            </p>
                            <div className="space-y-3">
                              {comp.rounds.map((round, idx) => {
                                const droppedOut = round.totalParticipants - round.cleared;
                                const dropoutPercentage = ((droppedOut / round.totalParticipants) * 100).toFixed(1);
                                return (
                                  <div key={idx} className="p-4 bg-gradient-to-r from-secondary to-secondary/70 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                      <div>
                                        <h4 className="font-bold text-foreground text-base">{round.name}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          Deadline: {new Date(round.deadline).toLocaleDateString('en-IN')}
                                        </p>
                                      </div>
                                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                                        Round {idx + 1}
                                      </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-4 gap-3 mb-4">
                                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                        <p className="text-xs text-muted-foreground font-semibold mb-1">Started With</p>
                                        <p className="text-2xl font-bold text-blue-600">{round.totalParticipants}</p>
                                      </div>
                                      <div className="p-3 bg-green-50 rounded border border-green-200">
                                        <p className="text-xs text-muted-foreground font-semibold mb-1">Cleared</p>
                                        <p className="text-2xl font-bold text-green-600">{round.cleared}</p>
                                      </div>
                                      <div className="p-3 bg-red-50 rounded border border-red-200">
                                        <p className="text-xs text-muted-foreground font-semibold mb-1">Dropped Out</p>
                                        <p className="text-2xl font-bold text-red-600">{droppedOut}</p>
                                      </div>
                                      <div className="p-3 bg-primary/10 rounded border border-primary/20">
                                        <p className="text-xs text-muted-foreground font-semibold mb-1">Success Rate</p>
                                        <p className="text-2xl font-bold text-primary">{round.clearancePercentage}%</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden border">
                                        <div className="flex h-full">
                                          <div 
                                            className="bg-green-600" 
                                            style={{ width: `${round.clearancePercentage}%` }}
                                          ></div>
                                          <div 
                                            className="bg-red-600" 
                                            style={{ width: `${dropoutPercentage}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                                        {dropoutPercentage}% dropped
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className="flex-shrink-0">
                      {expandedId === comp.id ? (
                        <ChevronUp className="w-6 h-6 text-primary" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
