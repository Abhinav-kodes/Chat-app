import "../App.css"
type AuthImagePatternProps = {
  title: string;
  subtitle: string;
};

const AuthImagePattern = ({ title, subtitle }: AuthImagePatternProps ) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
           <div 
           key={i}
           className={`aspect-square rounded-2xl ${
            i % 2 === 0 ? "bg-gray-400 animate-pulse" : "bg-blue-300"
            }`} 
            />



          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;