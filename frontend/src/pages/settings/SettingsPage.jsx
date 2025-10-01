import EditProfileForm from "./EditProfileForm";
import LogOutButton from "./LogOutButton";

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-8 flex flex-col gap-4">
      <LogOutButton />
      <EditProfileForm />
    </div>
  );
}
