-- CreateTable
CREATE TABLE "компании" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200),
    "legal_name" VARCHAR(300),
    "phone" VARCHAR(50),
    "email" VARCHAR(150),
    "specialization" VARCHAR(20),
    "logo_url" TEXT,
    "requisites_json" JSONB,
    "disk_quota_mb" INTEGER,
    "disk_used_mb" INTEGER,
    "status" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "компании_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "сотрудники" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "full_name" VARCHAR(200),
    "phone" VARCHAR(50),
    "email" VARCHAR(150),
    "position" VARCHAR(100),
    "pin_code_hash" VARCHAR(255),
    "is_active" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "last_login_at" TIMESTAMPTZ(6),
    "pin_updated_at" TIMESTAMPTZ(6),
    "pin_failed_attempts" INTEGER NOT NULL DEFAULT 0,
    "pin_locked_until" TIMESTAMPTZ(6),

    CONSTRAINT "сотрудники_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "авто_доноры" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "vin" VARCHAR(50),
    "make" VARCHAR(100),
    "model" VARCHAR(100),
    "year" INTEGER,
    "body_type" VARCHAR(100),
    "engine" VARCHAR(100),
    "transmission" VARCHAR(100),
    "purchase_price" DECIMAL(12,2),
    "status" VARCHAR(30),
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "авто_доноры_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "запчасти" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "auto_donor_id" INTEGER,
    "name" VARCHAR(200),
    "oem_number" VARCHAR(100),
    "internal_sku" VARCHAR(100),
    "condition" VARCHAR(20),
    "current_price" DECIMAL(12,2),
    "temp_price" DECIMAL(12,2),
    "allocated_cost" DECIMAL(12,2),
    "status" VARCHAR(30),
    "liquidity_color" VARCHAR(10),
    "storage_days" INTEGER,
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "запчасти_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "сотрудники" ADD CONSTRAINT "сотрудники_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "компании"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "запчасти" ADD CONSTRAINT "запчасти_auto_donor_id_fkey" FOREIGN KEY ("auto_donor_id") REFERENCES "авто_доноры"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "запчасти" ADD CONSTRAINT "запчасти_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "компании"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
