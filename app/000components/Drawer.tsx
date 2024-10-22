import React, { useState } from "react"

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
          {children}
        </div>
      </div>
    </>
  )
}
