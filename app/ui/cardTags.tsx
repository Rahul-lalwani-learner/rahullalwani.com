export function Tag({name}: {name: string}){
    return <div className="inline-flex p-1 text-background-black dark:text-white bg-gray-background dark:bg-[#1a2230] rounded-lg text-xs">
        {name}
    </div>
}