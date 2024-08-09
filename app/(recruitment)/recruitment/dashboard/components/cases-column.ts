"use client"

import { ColumnDef } from "@tanstack/react-table"

export type CaseTableProps = {
   name : string,
   createdAt : Date,
   skills : number,
   invites : 12,
   candidates : 12,
   status : string,
}

export const caseTableColumns : ColumnDef<CaseTableProps>[] = [
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
    },
    {
        header: "Skills",
        accessorKey: "skills",
    },
    {
        header: "Invites",
        accessorKey: "invites",
    },
    {
        header: "Candidates",
        accessorKey: "candidates",
    },
    {
        header: "Status",
        accessorKey: "status",
    },
    {
        header: "Action",
        accessorKey: "action",
    }
]