import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { formatDate, getParticipationRate } from '@/lib/utils'
import StatusBadge from './StatusBadge'
import { getAllElections } from '@/services/adminService'
import { Election } from '@/types/common'
import { Skeleton } from '@/components/ui/skeleton'


const ElectionManagement = () => {
  const { data: elections = [], isLoading, error } = useQuery<Election[]>({
    queryKey: ['elections'],
    queryFn: getAllElections,
  });
  const [activeElection, setActiveElection] = useState<Election | undefined>(undefined);

  useEffect(() => {
    if (elections.length > 0) setActiveElection(elections[0]);
  }, [elections]);

  if (isLoading) return <Skeleton className="h-96 w-full" />;
  if (error) return <div>Error loading elections</div>
  if (elections.length === 0) return <div>No elections found.</div>;
  if (!activeElection) return null;

  return (
    <>
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Election Management</CardTitle>
            <CardDescription>View and manage all elections in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-500 ">
                    <th scope="col" className="pb-3 pl-4 pr-3">Election Title</th>
                    <th scope="col" className="pb-3 px-3">Status</th>
                    <th scope="col" className="pb-3 px-3">Start Date</th>
                    <th scope="col" className="pb-3 px-3">End Date</th>
                    <th scope="col" className="pb-3 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {elections?.map((election, index) => (
                    <tr key={election?.id || index} className="border-b text-sm ">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium">{election?.name}</td>
                      <td className="whitespace-nowrap px-3 py-4"><StatusBadge status={election?.status}/></td>
                      <td className="whitespace-nowrap px-3 py-4">{formatDate(election?.startDate)}</td>
                      <td className="whitespace-nowrap px-3 py-4">{formatDate(election?.endDate)}</td>
                      <td className="whitespace-nowrap px-3 py-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            className='cursor-pointer'
                            size="sm"
                            onClick={() => setActiveElection(election)}
                            disabled={activeElection?.id === election.id}
                          >
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{activeElection?.name}</CardTitle>
                <CardDescription>Detailed statistics and management options</CardDescription>
              </div>
              <div><StatusBadge status={activeElection?.status}/></div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger className='cursor-pointer' value="overview">Overview</TabsTrigger>
                <TabsTrigger className='cursor-pointer' value="results">Results</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Election Details</h3>
                    <div className="space-y-3 rounded-lg border p-4 ">
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">Status:</p>
                        <p className="text-sm font-medium">
                          {activeElection?.status.charAt(0).toUpperCase() + activeElection?.status.slice(1)}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">Start Date:</p>
                        <p className="text-sm font-medium">{formatDate(activeElection?.startDate)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">End Date:</p>
                        <p className="text-sm font-medium">{formatDate(activeElection?.endDate)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">Total Eligible Voters:</p>
                        <p className="text-sm font-medium">{activeElection?.totalVoters}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">Registered Voters:</p>
                        <p className="text-sm font-medium">{activeElection?.registeredVoters}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">Votes Cast:</p>
                        <p className="text-sm font-medium">{activeElection?.votesCount}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">Participation Rate:</p>
                        <p className="text-sm font-medium">
                          {activeElection?.status === "upcoming"
                            ? "Not started"
                            : `${getParticipationRate(activeElection)}%`}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p className="text-sm font-medium text-gray-500 ">Number of Candidates:</p>
                        <p className="text-sm font-medium">{activeElection?.candidates?.length}</p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <h4 className="text-sm font-medium text-gray-500 ">Election Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeElection?.status === "upcoming" && <Button className='bg-green-700 text-white cursor-pointer'>Start Election</Button>}
                        {activeElection?.status === "active" && <Button className='bg-red-500 border-2 cursor-pointer' variant="destructive">End Election</Button>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Participation Statistics</h3>
                    <div className="h-80 rounded-lg border p-4 ">
                      {activeElection?.status !== "upcoming" ? (<></>
                        
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-center text-gray-500 ">
                            Statistics will be available once the election starts
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="results" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Election Results</h3>
                    {activeElection?.status === "upcoming" ? (
                      <div className="rounded-lg border border-dashed p-8 text-center ">
                        <p className="text-gray-500 ">
                          Results will be available once the election starts
                        </p>
                      </div>
                    ) : (
                      <div className="h-80 rounded-lg border p-4 ">
                        {/* Results content here */}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Candidate Results</h3>
                    <div className="overflow-x-auto rounded-lg border ">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800">
                            <th className="px-4 py-3">Candidate</th>
                            <th className="px-4 py-3">Party</th>
                            <th className="px-4 py-3">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeElection?.candidates?.map((candidate) => (
                            <tr key={candidate?.id} className="border-b text-sm ">
                              <td className="whitespace-nowrap px-4 py-3 font-medium">{candidate?.name}</td>
                              <td className="whitespace-nowrap px-4 py-3">{candidate.party}</td>
                              <td className="whitespace-nowrap px-4 py-3">
                                {activeElection?.votesCount > 0
                                  ? `${((candidate.votes / activeElection?.votesCount) * 100).toFixed(1)}%`
                                  : "0%"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Publish Results</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ElectionManagement