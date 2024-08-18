-- CreateTable
CREATE TABLE "OAuthState" (
    "id" SERIAL NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OAuthState_pkey" PRIMARY KEY ("id")
);
