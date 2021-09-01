import { useState } from 'react'
type Props = {
  entry: {
    id: number;
    url: string;
    title: string;
    published_at: string;
    imageUrl?: string;
    feed: { site_url: string };
  };
};
export default function Entry({ entry }: Props) {
  const [hovered, setHovered] = useState(false)
//  const date = new Date(entry.published_at)
//  const dateString = `${date.getFullYear()}/${('00'+(date.getMonth()+1)).slice(-2)}/${('00'+date.getDate()).slice(-2)}`
// {dateString} |{" "}
  return (
    <a href={entry.url} rel="noopener" target="_blanck" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div style={{ display: "flex", justifyContent: "space-between", background: hovered ? '#eeeeee' : 'none', borderRadius: '8px'}}>
      <div>
        <h3 style={{margin: '0px', fontWeight: 'normal'}}>
          {entry.title}
        </h3>
        <div>
          {entry.feed.site_url
            .split("/")
            .slice(2)
            .filter((s) => s !== "")
            .join("/")}
        </div>
      </div>
      <div
        style={{
          width: 160,
          height: 90,
          backgroundImage: `url(${entry.imageUrl || "/image-empty.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          flexShrink: 0,
        }}
      ></div>
    </div>
    </a>
  );
}
