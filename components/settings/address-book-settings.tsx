'use client'

import { useEffect, useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  getAddressBookEntries,
  updateAddressBookEntry,
  deleteAddressBookEntry,
  type AddressBookEntry,
} from '@/lib/address-book'

export function AddressBookSettings() {
  const [entries, setEntries] = useState<AddressBookEntry[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setEntries(getAddressBookEntries())
  }, [])

  function startEdit(entry: AddressBookEntry) {
    setEditingId(entry.id)
    setEditLabel(entry.label)
  }

  function saveEdit(id: string) {
    const label = editLabel.trim()
    if (!label) {
      toast.error('Label cannot be empty')
      return
    }
    updateAddressBookEntry(id, { label })
    setEntries(getAddressBookEntries())
    setEditingId(null)
    toast.success('Entry updated')
  }

  function handleDelete(id: string) {
    deleteAddressBookEntry(id)
    setEntries(getAddressBookEntries())
    setConfirmingDeleteId(null)
    toast.success('Entry removed')
  }

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No saved addresses yet. Addresses you save while creating a stream will appear here.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
        >
          <div className="min-w-0 flex-1">
            {editingId === entry.id ? (
              <Input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEdit(entry.id)
                  if (e.key === 'Escape') setEditingId(null)
                }}
                autoFocus
                className="h-8"
              />
            ) : (
              <p className="truncate text-sm font-medium">{entry.label}</p>
            )}
            <p className="truncate text-xs text-muted-foreground font-mono mt-0.5">
              {entry.federationAddress ?? entry.address}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {editingId === entry.id ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label="Save"
                  onClick={() => saveEdit(entry.id)}
                >
                  <Check className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label="Cancel"
                  onClick={() => setEditingId(null)}
                >
                  <X className="size-4" />
                </Button>
              </>
            ) : confirmingDeleteId === entry.id ? (
              <>
                <span className="text-xs text-muted-foreground mr-1">Remove?</span>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8"
                  onClick={() => handleDelete(entry.id)}
                >
                  Confirm
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8"
                  onClick={() => setConfirmingDeleteId(null)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label="Edit label"
                  onClick={() => startEdit(entry)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:text-destructive"
                  aria-label="Delete"
                  onClick={() => setConfirmingDeleteId(entry.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
