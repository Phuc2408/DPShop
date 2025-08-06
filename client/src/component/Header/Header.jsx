import Navigation from "./Navigation";
export default function Header() {
    return (
        <div className="font-sans px-8 py-4 flex flex-col gap-8">
            <Navigation></Navigation>
        </div>  
    );
}