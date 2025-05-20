"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllElections } from "@/services/adminService"

export default function AddCandidate() {
  const navigate = useNavigate()
  const [candidates, setCandidates] = useState([
    { id: 1, name: "", party: "" },
    { id: 2, name: "", party: "" },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [elections, setElections] = useState([])
  const [selectedElection, setSelectedElection] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const data = await getAllElections()
        setElections(data)
      } catch (err) {
        setError("Failed to load elections")
      }
    }
    fetchElections()
  }, [])

  const addCandidate = () => {
    setCandidates([...candidates, { id: candidates.length + 1, name: "", party: "" }])
  }

  const removeCandidate = (id) => {
    if (candidates.length <= 2) return
    setCandidates(candidates.filter((candidate) => candidate.id !== id))
  }

  const updateCandidate = (id, field, value) => {
    setCandidates(candidates.map((candidate) => (candidate.id === id ? { ...candidate, [field]: value } : candidate)))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    if (!selectedElection) {
      setError("Please select an election.")
      setIsSubmitting(false)
      return
    }
    // TODO: Integrate API to add all candidates to the selected election
  
    setTimeout(() => {
      navigate("/admin/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/admin/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 ">Add new candidates</h1>
          <p className="text-gray-600 ">Set up a new election with candidates and voting period</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="election">Select Election to add candidates</Label>
            <Select value={selectedElection} onValueChange={setSelectedElection}>
              <SelectTrigger id="election" className="w-full">
                <SelectValue placeholder="Select election" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {elections.length === 0 ? null :
                  elections.map((election) => (
                    <SelectItem key={election.id || election.name} value={election.id || election.name}>
                      {election.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-8 md:grid-cols-1">
            <div className="md:col-span-2 md:space-y-8">
             

              <Card>
                <CardHeader>
                  <CardTitle>Candidates</CardTitle>
                  <CardDescription>Add candidates for this election</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="grid gap-4 rounded-lg border p-4 sm:grid-cols-[1fr,1fr,auto]"
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`candidate-name-${candidate.id}`}>Candidate Name</Label>
                        <Input
                          id={`candidate-name-${candidate.id}`}
                          value={candidate.name}
                          onChange={(e) => updateCandidate(candidate.id, "name", e.target.value)}
                          placeholder="Full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`candidate-party-${candidate.id}`}>Party/Affiliation</Label>
                        <Input
                          id={`candidate-party-${candidate.id}`}
                          value={candidate.party}
                          onChange={(e) => updateCandidate(candidate.id, "party", e.target.value)}
                          placeholder="Party or independent"
                        />
                      </div>

                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-500 "
                          onClick={() => removeCandidate(candidate.id)}
                          disabled={candidates.length <= 2}
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Remove candidate</span>
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" onClick={addCandidate}>
                    Add Another Candidate
                  </Button>
                </CardContent>
              </Card>
            </div>

            
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="mt-8 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Election"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
