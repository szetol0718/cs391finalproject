//author: Leigh Brown
//helper function for the archive page. Formats the archive's display
import { ArchiveProps } from "@/types";

export default function ArchivePreview({ archive }: { archive: ArchiveProps }) {
    return (
        <div className="rounded-lg p-4 m-3 w-[80%] mx-auto">
            <h5 className="font-bold text-lg text-green-900 mb-1">
                Week: {new Date(archive.weekStart).toLocaleDateString()} -{" "}
                {new Date(archive.weekEnd).toLocaleDateString()}
            </h5>

            <div className="flex flex-wrap gap-6 m-auto">
                {archive.habits.map((habit) => (
                    <div key={habit.id} className="flex flex-col sm:w-[50%] md:w-[40%] lg:w-[20%] p-2 border rounded-lg">
                        <div className="w-full flex justify-between mb-2">
                            <p className="font-semibold text-sm pb-2">{habit.habit}</p>
                            <p className="font-semibold text-sm">{habit.weeklyCompleted}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
