import React, { useContext, useState } from "react";
import {
  UserRound,
  Mail,
  ShieldCheck,
  LogOut,
  Trash2,
  AlertTriangle,
  ArrowRight,
  LockKeyhole,
  X,
} from "lucide-react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Common/Loader";
import toast from "react-hot-toast";
import api from "../api/axios";

const AccountSettings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await logout();
      toast.success(response.message || "Logout successful!");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          response.error ||
          "Logout failed, Try again!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const accountHolderName = user && user.name;
  console.log(accountHolderName);

  // Delete Account Function
  const handleDelete = async () => {
    if(confirmation !== accountHolderName) {
      toast.error(`Type "${accountHolderName}" to confirm account deletion.`);
      return;
    }
    try {
      setIsDeleting(true);
      const response = await api.delete("/auth/delete-account");
      toast.success(response.data.message || "Account Deleted!");
      navigate("/signup", { replace: true });
      setShowDeleteModal(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Error deleting account, Try again!"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const cardClass =
    "rounded-2xl border-2 border-[#202020] bg-white shadow-[4px_4px_0_#202020]";

  const handleOpenDeleteModal = () => {
    setConfirmation("");
    setShowDeleteModal(true);
  };

  return (
    <div className="mx-auto max-w-5xl pb-10 text-[#202020]">
      {/* Page heading */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-lg border-2 border-[#202020] bg-[#F2CB57] px-3 py-1.5 text-xs font-black uppercase tracking-wider">
          <ShieldCheck size={15} />
          Account & Security
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          Account Settings<span className="text-[#EC5E27]">.</span>
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#707070]">
          Manage your Writora account, review your account information, or
          securely leave your session.
        </p>
      </div>

      {/* Account summary */}
      <section className={`${cardClass} mb-7 overflow-hidden`}>
        <div className="border-b-2 border-[#202020] bg-[#F2CB57] px-5 py-4 sm:px-7">
          <p className="text-xs font-black uppercase tracking-[2px]">
            Your account
          </p>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-[#202020] bg-[#D8E8D2] text-2xl font-black shadow-[3px_3px_0_#202020]">
            W
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="break-words text-2xl font-black">Writora Writer</h2>
            {user && (
              <p className="mt-1 break-all text-sm text-[#777]">{user.email}</p>
            )}

            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[#9FC5A0] bg-[#EAF5E8] px-3 py-1.5 text-xs font-bold text-[#285B35]">
              <ShieldCheck size={14} />
              Account overview
            </div>
          </div>
        </div>
      </section>

      {/* Account information */}
      <section className={`${cardClass} mb-7 p-5 sm:p-7`}>
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-xl border-2 border-[#202020] bg-[#F2CB57] p-3">
            <UserRound size={21} />
          </div>

          <div>
            <h2 className="text-xl font-black">Account Information</h2>
            <p className="mt-1 text-sm text-[#777]">
              Your registered account details.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-xl border-2 border-[#E5E5E5] bg-[#FDFDF1] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#202020] bg-white">
              <UserRound size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#888]">Full name</p>
              {user && (
                <p className="mt-1 break-words text-sm font-bold">
                  {user.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border-2 border-[#E5E5E5] bg-[#FDFDF1] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#202020] bg-white">
              <Mail size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#888]">Email address</p>
              {user && (
                <p className="mt-1 break-all text-sm font-bold">{user.email}</p>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#888]">
          Your account details will appear here.
        </p>
      </section>

      {/* Session */}
      <section className={`${cardClass} mb-7 p-5 sm:p-7`}>
        <div className="mb-5 flex items-start gap-3">
          <div className="rounded-xl border-2 border-[#202020] bg-[#D8E8D2] p-3">
            <LockKeyhole size={21} />
          </div>

          <div>
            <h2 className="text-xl font-black">Session & Security</h2>
            <p className="mt-1 text-sm text-[#777]">
              Manage your Writora session.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border-2 border-[#E5E5E5] p-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h3 className="font-bold">Log out of Writora</h3>
            <p className="mt-1 text-sm leading-5 text-[#777]">
              End your current session on this browser.
            </p>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleLogout}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-[#202020] bg-white px-4 py-3 text-sm font-black transition hover:bg-[#F2CB57] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader text="Signing out..." />
              </>
            ) : (
              <>
                <LogOut size={17} />
                Log Out
              </>
            )}
          </button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="overflow-hidden rounded-2xl border-2 border-red-300 bg-white shadow-[4px_4px_0_#202020]">
        <div className="flex items-center gap-3 border-b-2 border-red-200 bg-red-50 px-5 py-4 sm:px-7">
          <AlertTriangle size={21} className="text-red-600" />
          <h2 className="text-lg font-black text-red-700">Danger Zone</h2>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="max-w-xl">
            <h3 className="font-black">Delete your account</h3>
            <p className="mt-2 text-sm leading-6 text-[#777]">
              Permanently delete your Writora account. This action cannot be
              undone.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenDeleteModal}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-red-600 bg-white px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-600 hover:text-white cursor-pointer'"
          >
            <Trash2 size={17} />
            Delete Account
          </button>
        </div>
      </section>

      {/* Delete confirmation modal*/}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            className="w-full max-w-md rounded-2xl border-2 border-[#202020] bg-[#FDFDF1] p-6 shadow-[6px_6px_0_#202020] sm:p-7"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-red-600 bg-red-50 text-red-600">
                <Trash2 size={23} />
              </div>

              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                aria-label="Close confirmation"
                className="rounded-lg p-2 transition hover:bg-[#F2CB57]"
              >
                <X size={19} />
              </button>
            </div>

            <h2 id="delete-account-title" className="text-2xl font-black">
              Are you absolutely sure?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#666]">
              This permanently deletes your account. This action cannot be
              undone.
            </p>

            <label
              htmlFor="delete-confirmation"
              className="mb-2 mt-6 block text-sm font-bold"
            >
              Type <span className="font-black text-red-600">{accountHolderName}</span> to
              confirm
            </label>

            <input
              id="delete-confirmation"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder={`Type ${accountHolderName}`}
              autoComplete="off"
              className="w-full rounded-xl border-2 border-[#202020] bg-white px-4 py-3 text-sm font-bold outline-none focus:bg-[#FFF9E7]"
            />

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-xl border-2 border-[#202020] bg-white px-4 py-3 text-sm font-black transition hover:bg-[#F2CB57] cursor-pointer"
              >
                Cancel
              </button>
              {/* DELETE BUTTON */}
              <button
                type="button"
                disabled={confirmation !== accountHolderName}
                onClick={handleDelete}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-red-600 bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? <><Loader text="Deleting..." /></> : <><ArrowRight size={17} />
                Delete Permanently</>}
                
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
