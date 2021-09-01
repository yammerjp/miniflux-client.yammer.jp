import { useState } from "react";
import Entry from "./Entry";
type Props = {
  entries: {
    id: number;
    url: string;
    title: string;
    published_at: string;
    dateString: string;
    imageUrl?: string;
    feed: { site_url: string };
  }[];
};

export default function Entries({ entries }: { entries: any[] }) {
  const [previewPageUrl, setPreviewPage] = useState('')

  const dateStrings = Array.from(new Set(entries.map(e => e.dateString)))

  return (
    <div>
      {dateStrings.map(dateString => (
        <div key={dateString}>
          <h2>
            {dateString}
          </h2>
          {entries.filter(e => e.dateString === dateString).map(e => (
            <div key={e.id} onMouseOver={() => {setPreviewPage(e.url)}}>
            <Entry entry={e} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )

}
