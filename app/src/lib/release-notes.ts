
type Release = {
  readonly name: string
  readonly notes: ReadonlyArray<string>
  readonly pub_date: string
  readonly version: string
}

type ReleaseEntry = {
  readonly kind: 'new' | 'added' | 'removed' | 'fixed' | 'improved' | 'pretext'
  readonly message: string
}

const itemEntryRe = /^\[(new|fixed|improved|removed|added|pretext)\]\s(.*)/i

export function parseReleaseEntries(notes: ReadonlyArray<string>): ReadonlyArray<ReleaseEntry> {
  const entries = new Array<ReleaseEntry>()

  for (const note of notes) {
    const text = note.trim()
    const match = itemEntryRe.exec(text)
    if (match !== null) {
      const kind = match[1].toLowerCase()
      const message = match[2]

      if (kind === 'new') {
        entries.push({ kind, message })
      } else if (kind === 'fixed') {
        entries.push({ kind, message })
      } else if (kind === 'improved') {
        entries.push({ kind, message })
      } else if (kind === 'removed') {
        entries.push({ kind, message })
      } else if (kind === 'added') {
        entries.push({ kind, message })
      } else if (kind === 'pretext') {
        entries.push({ kind, message })
      }
    }
  }

  return entries
}

export async function getChangeLog(): Promise<ReadonlyArray<Release>> {
  const changelog = 'https://central.github.com/deployments/desktop/desktop/changelog.json'
  const query = __RELEASE_CHANNEL__ === 'beta' ? '?env=beta' : ''

  const response = await fetch(`${changelog}${query}`)
  if (response.ok) {
    const releases: ReadonlyArray<Release> = await response.json()
    return releases
  } else {
    return []
  }
}
