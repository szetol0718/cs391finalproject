//author: Leigh Brown
//display for the archive page. displays all previously archived week's habits
import ArchivePreview from "./archivePreview";
import { ArchiveProps } from "@/types";

export default function ArchiveDisplay({ inputArchives }: { inputArchives: ArchiveProps[] }) {
    const a = inputArchives;

    return (
        <div className="flex flex-col items-center w-full">
            {a.map((archive) => (
                <ArchivePreview key={archive.weekStart} archive={archive} />
            ))}
        </div>
    );
}
