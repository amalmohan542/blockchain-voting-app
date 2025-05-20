import React from 'react'
import { mockElections } from '@/constants/common'
import { BarChart3, Users, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

const ElectionOverView = () => {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Elections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockElections.length}</p>
                      <p className="text-xs text-gray-500">Total elections in the system</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
    
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Registered Voters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-green-100 p-2 text-green-600 ">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {mockElections.reduce((acc, election) => acc + election.registeredVoters, 0)}
                      </p>
                      <p className="text-xs text-gray-500">Total registered voters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
    
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active Elections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-yellow-100 p-2 text-yellow-600 ">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockElections.filter((e) => e.status === "active").length}</p>
                      <p className="text-xs text-gray-500">Currently active elections</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
  )
}

export default ElectionOverView;