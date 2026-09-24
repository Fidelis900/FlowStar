'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

/**
 * Every piece of FlowStar's localStorage-backed state uses a key prefixed
 * with `flowstar` (`flowstar:`, `flowstar_`, or `flowstar-` depending on the
 * module) — hidden streams, blocked senders, address book, webhooks and
 * their delivery history, notifications and preferences, per-stream
 * auto-withdraw settings, form drafts, cached token lists, network choice,
 * and display preferences (e.g. show-USD). Wallet connection (`walletId`)
 * and OS/browser-level theme are intentionally left untouched — this is a
 * reset of FlowStar's own app data, not a full storage wipe.
 */
function clearFlowStarLocalStorage(): number {
  const keys = Object.keys(window.localStorage).filter((k) => k.startsWith('flowstar'))
  keys.forEach((k) => window.localStorage.removeItem(k))
  return keys.length
}

export function ClearLocalData() {
  const [confirming, setConfirming] = useState(false)

  function handleClear() {
    const count = clearFlowStarLocalStorage()
    setConfirming(false)
    toast.success(`Cleared ${count} item${count === 1 ? '' : 's'} of local data`, {
      description: 'Reloading…',
    })
    setTimeout(() => window.location.reload(), 800)
  }

  return (
    <div className="rounded-lg border border-destructive/40 p-4 space-y-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Clear local data</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Resets hidden streams, blocked senders, your address book, webhooks and their
            delivery history, notifications and preferences, auto-withdraw settings, form
            drafts, and display preferences on this device. This does not affect anything
            on-chain — your streams themselves are unaffected. Your wallet connection is not
            cleared.
          </p>
        </div>
      </div>
      {confirming ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Are you sure? This can't be undone.</span>
          <Button variant="destructive" size="sm" onClick={handleClear}>
            Confirm clear
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setConfirming(true)}>
          Clear local data
        </Button>
      )}
    </div>
  )
}
