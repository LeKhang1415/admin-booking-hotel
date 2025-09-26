export default function UserItem({
    name,
    email,
    lineClamp = true,
}: {
    name?: string;
    email?: string;
    lineClamp?: boolean;
}) {
    const emailText = lineClamp ? `${email?.slice(0, 10)}...` : email;
    return (
        <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-medium">
                {name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{name}</div>
                <div className="text-sm text-gray-500">{emailText}</div>
            </div>
        </div>
    );
}
