import logo from "@/assets/logo-mark.svg";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center mt-12 mx-2 md:mx-auto">
      <div>
        <h1 className="flex items-center gap-x-8 font-medium text-xl text-center">
          <img src={logo} alt="logo" className="object-contain" />
          Devs Conf
        </h1>
      </div>

      <div>
        <h2 className="text-4xl font-semibold text-center mt-8">
          Your Journey to Coding Conf 2025 Starts Here!
        </h2>
        <p className="mt-8 text-lg text-center">
          Secure your spot at next year's biggest coding conference.
        </p>
      </div>
    </div>
  );
}
