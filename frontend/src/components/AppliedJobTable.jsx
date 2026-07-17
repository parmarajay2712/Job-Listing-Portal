import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                                You haven't applied to any job yet.
                            </TableCell>
                        </TableRow>
                    ) : allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>
                                {appliedJob?.createdAt
                                    ? new Date(appliedJob.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                    : '—'}
                            </TableCell>
                            <TableCell>{appliedJob.job?.title || '—'}</TableCell>
                            <TableCell>{appliedJob.job?.company?.name || '—'}</TableCell>
                            <TableCell className="text-right">
                                <Badge className={`${
                                    appliedJob?.status === 'rejected' ? 'bg-red-400' :
                                    appliedJob?.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'
                                }`}>
                                    {appliedJob?.status ? appliedJob.status.toUpperCase() : 'PENDING'}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable