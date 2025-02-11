import React, { createContext, useContext, useState } from "react";

interface MessageThresholdContextType {
  maxMessages: number;
  messagesSent: number;
  incrementMessagesSent: () => void;
  resetMessagesSent: () => void;
}

const MessageThresholdContext = createContext<
  MessageThresholdContextType | undefined
>(undefined);

export const useMessageThreshold = () => {
  const context = useContext(MessageThresholdContext);
  if (!context) {
    throw new Error(
      "useMessageThreshold must be used within a MessageThresholdProvider"
    );
  }
  return context;
};

export const MessageThresholdProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [messagesSent, setMessagesSent] = useState(0);
  const maxMessages = 5;

  const incrementMessagesSent = () => {
    if (messagesSent < maxMessages) {
      setMessagesSent(messagesSent + 1);
    }
  };

  const resetMessagesSent = () => {
    setMessagesSent(0);
  };

  return (
    <MessageThresholdContext.Provider
      value={{
        maxMessages,
        messagesSent,
        incrementMessagesSent,
        resetMessagesSent,
      }}
    >
      {children}
    </MessageThresholdContext.Provider>
  );
};
