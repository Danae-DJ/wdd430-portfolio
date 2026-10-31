interface BiocardProps { //define the props
    name: string;
    bio: string;
}

//create a server component
export default function BioCard({name, bio }: BiocardProps) {
    return (
        <article className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {name}
            </h3>
            <p className="text-gray-700">
                {bio}
            </p>
        </article>
    );
}