-- CreateTable
CREATE TABLE "TeacherSchedules" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "available_at" DATE NOT NULL,
    "start_at" TIME NOT NULL,
    "end_at" TIME NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "TeacherSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "unique_code" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "payment_at" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionStatus" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherSchedules_uuid_key" ON "TeacherSchedules"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_uuid_key" ON "Transactions"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_uuid_key" ON "Payments"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionStatus_uuid_key" ON "TransactionStatus"("uuid");

-- AddForeignKey
ALTER TABLE "TeacherSchedules" ADD CONSTRAINT "TeacherSchedules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "TeacherSchedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "TransactionStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
