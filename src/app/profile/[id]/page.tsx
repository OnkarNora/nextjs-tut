export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <p className="text-4xl">Profile Page 
            <span className="p-2 ml-2">{params.id}</span>
            </p>
        </div>
    )
}