import App from "@/components/App";
import { ClientErrorBoundary, ErrorBoundary } from "@/components/ErrorHandler";
import { chakraTheme } from "@/components/theme";
import { resettingSchema } from "@/data/recoil";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { SWRConfig } from "swr";

const SWRWrapper = ({ children }: { children: ReactNode }) => {
  const isResettingSchema = useRecoilValue(resettingSchema);
  const toast = useToast();
  const handleError = (err: Error) => {
    if (isResettingSchema) {
      console.warn("Ignoring error while resetting schema", err);
    } else {
      toast({
        title: "An error occurred",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return <SWRConfig value={{ onError: handleError }}>{children}</SWRConfig>;
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <ErrorBoundary>
        <RecoilRoot>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <SWRWrapper>
              <ClientErrorBoundary>
                <App />
              </ClientErrorBoundary>
            </SWRWrapper>
          </BrowserRouter>
        </RecoilRoot>
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
