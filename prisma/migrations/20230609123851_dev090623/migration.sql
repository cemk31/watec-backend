-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "street" TEXT,
    "zipCode" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
