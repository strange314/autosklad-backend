--
-- PostgreSQL database dump
--

\restrict 3O3PkrD0PqE0wdrZhFNUeDlDppeLTQqNsgV19JRKeEvbYSpOkqqkSdAEQ3DG9BI

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: авто_доноры; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."авто_доноры" (
    id integer NOT NULL,
    company_id integer,
    vin character varying(50),
    make character varying(100),
    model character varying(100),
    year integer,
    body_type character varying(100),
    engine character varying(100),
    transmission character varying(100),
    purchase_price numeric(12,2),
    status character varying(30),
    created_at timestamp with time zone
);


ALTER TABLE public."авто_доноры" OWNER TO postgres;

--
-- Name: авто_доноры_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."авто_доноры_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."авто_доноры_id_seq" OWNER TO postgres;

--
-- Name: авто_доноры_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."авто_доноры_id_seq" OWNED BY public."авто_доноры".id;


--
-- Name: аккаунты_компании_на_маркетплейса; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."аккаунты_компании_на_маркетплейса" (
    id integer CONSTRAINT "аккаунты_компании_на_маркет_id_not_null" NOT NULL,
    company_id integer,
    marketplace_id integer,
    external_shop_id character varying(200),
    settings_json jsonb,
    status character varying(20)
);


ALTER TABLE public."аккаунты_компании_на_маркетплейса" OWNER TO postgres;

--
-- Name: аккаунты_компании_на_маркетпл_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."аккаунты_компании_на_маркетпл_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."аккаунты_компании_на_маркетпл_id_seq" OWNER TO postgres;

--
-- Name: аккаунты_компании_на_маркетпл_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."аккаунты_компании_на_маркетпл_id_seq" OWNED BY public."аккаунты_компании_на_маркетплейса".id;


--
-- Name: движения_денег; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."движения_денег" (
    id integer NOT NULL,
    company_id integer,
    type character varying(20),
    category_id integer,
    amount numeric(12,2),
    operation_date date,
    related_deal_id integer,
    comment text,
    created_by_employee_id integer,
    created_at timestamp with time zone
);


ALTER TABLE public."движения_денег" OWNER TO postgres;

--
-- Name: движения_денег_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."движения_денег_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."движения_денег_id_seq" OWNER TO postgres;

--
-- Name: движения_денег_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."движения_денег_id_seq" OWNED BY public."движения_денег".id;


--
-- Name: диалоги; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."диалоги" (
    id integer NOT NULL,
    company_id integer,
    counterparty_id integer,
    channel_id integer,
    external_chat_id character varying(200),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public."диалоги" OWNER TO postgres;

--
-- Name: диалоги_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."диалоги_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."диалоги_id_seq" OWNER TO postgres;

--
-- Name: диалоги_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."диалоги_id_seq" OWNED BY public."диалоги".id;


--
-- Name: журналы_аудита; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."журналы_аудита" (
    id integer NOT NULL,
    company_id integer,
    employee_id integer,
    entity_type character varying(30),
    entity_id integer,
    action character varying(20),
    created_at timestamp with time zone,
    ip_address character varying(50),
    before_data jsonb,
    after_data jsonb
);


ALTER TABLE public."журналы_аудита" OWNER TO postgres;

--
-- Name: журналы_аудита_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."журналы_аудита_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."журналы_аудита_id_seq" OWNER TO postgres;

--
-- Name: журналы_аудита_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."журналы_аудита_id_seq" OWNED BY public."журналы_аудита".id;


--
-- Name: задачи; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."задачи" (
    id integer NOT NULL,
    company_id integer,
    title character varying(200),
    description text,
    entity_type character varying(30),
    entity_id integer,
    assignee_id integer,
    creator_id integer,
    priority character varying(20),
    status character varying(20),
    due_date date,
    created_at timestamp with time zone,
    is_auto_generated boolean,
    source_event character varying(50)
);


ALTER TABLE public."задачи" OWNER TO postgres;

--
-- Name: задачи_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."задачи_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."задачи_id_seq" OWNER TO postgres;

--
-- Name: задачи_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."задачи_id_seq" OWNED BY public."задачи".id;


--
-- Name: заказы_маркетплейсов; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."заказы_маркетплейсов" (
    id integer NOT NULL,
    company_marketplace_account_id integer,
    external_order_id character varying(200),
    deal_id integer,
    status character varying(20),
    ordered_at timestamp with time zone
);


ALTER TABLE public."заказы_маркетплейсов" OWNER TO postgres;

--
-- Name: заказы_маркетплейсов_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."заказы_маркетплейсов_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."заказы_маркетплейсов_id_seq" OWNER TO postgres;

--
-- Name: заказы_маркетплейсов_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."заказы_маркетплейсов_id_seq" OWNED BY public."заказы_маркетплейсов".id;


--
-- Name: заказы_с_сайта; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."заказы_с_сайта" (
    id integer NOT NULL,
    company_id integer,
    deal_id integer,
    part_id integer,
    counterparty_id integer,
    created_at timestamp with time zone,
    source character varying(50)
);


ALTER TABLE public."заказы_с_сайта" OWNER TO postgres;

--
-- Name: заказы_с_сайта_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."заказы_с_сайта_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."заказы_с_сайта_id_seq" OWNER TO postgres;

--
-- Name: заказы_с_сайта_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."заказы_с_сайта_id_seq" OWNED BY public."заказы_с_сайта".id;


--
-- Name: запчасти; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."запчасти" (
    id integer NOT NULL,
    company_id integer,
    auto_donor_id integer,
    name character varying(200),
    oem_number character varying(100),
    internal_sku character varying(100),
    condition character varying(20),
    current_price numeric(12,2),
    temp_price numeric(12,2),
    allocated_cost numeric(12,2),
    status character varying(30),
    liquidity_color character varying(10),
    storage_days integer,
    created_at timestamp with time zone
);


ALTER TABLE public."запчасти" OWNER TO postgres;

--
-- Name: запчасти_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."запчасти_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."запчасти_id_seq" OWNER TO postgres;

--
-- Name: запчасти_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."запчасти_id_seq" OWNED BY public."запчасти".id;


--
-- Name: звонки; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."звонки" (
    id integer NOT NULL,
    company_id integer,
    counterparty_id integer,
    employee_id integer,
    deal_id integer,
    ats_call_id character varying(200),
    started_at timestamp with time zone,
    duration_sec integer,
    is_missed boolean,
    record_url text
);


ALTER TABLE public."звонки" OWNER TO postgres;

--
-- Name: звонки_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."звонки_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."звонки_id_seq" OWNER TO postgres;

--
-- Name: звонки_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."звонки_id_seq" OWNED BY public."звонки".id;


--
-- Name: каналы_коммуникации; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."каналы_коммуникации" (
    id integer NOT NULL,
    code character varying(50),
    name character varying(100)
);


ALTER TABLE public."каналы_коммуникации" OWNER TO postgres;

--
-- Name: каналы_коммуникации_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."каналы_коммуникации_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."каналы_коммуникации_id_seq" OWNER TO postgres;

--
-- Name: каналы_коммуникации_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."каналы_коммуникации_id_seq" OWNED BY public."каналы_коммуникации".id;


--
-- Name: категории_движения_денег; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."категории_движения_денег" (
    id integer NOT NULL,
    company_id integer,
    name character varying(150),
    type character varying(20)
);


ALTER TABLE public."категории_движения_денег" OWNER TO postgres;

--
-- Name: категории_движения_денег_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."категории_движения_денег_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."категории_движения_денег_id_seq" OWNER TO postgres;

--
-- Name: категории_движения_денег_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."категории_движения_денег_id_seq" OWNED BY public."категории_движения_денег".id;


--
-- Name: компании; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."компании" (
    id integer NOT NULL,
    name character varying(200),
    legal_name character varying(300),
    phone character varying(50),
    email character varying(150),
    specialization character varying(20),
    logo_url text,
    requisites_json jsonb,
    disk_quota_mb integer,
    disk_used_mb integer,
    status character varying(20),
    created_at timestamp with time zone
);


ALTER TABLE public."компании" OWNER TO postgres;

--
-- Name: компании_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."компании_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."компании_id_seq" OWNER TO postgres;

--
-- Name: компании_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."компании_id_seq" OWNED BY public."компании".id;


--
-- Name: контрагенты; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."контрагенты" (
    id integer NOT NULL,
    company_id integer,
    name character varying(200),
    phone character varying(50),
    email character varying(150),
    type character varying(30),
    delivery_preferences text,
    comment text,
    created_at timestamp with time zone
);


ALTER TABLE public."контрагенты" OWNER TO postgres;

--
-- Name: контрагенты_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."контрагенты_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."контрагенты_id_seq" OWNER TO postgres;

--
-- Name: контрагенты_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."контрагенты_id_seq" OWNED BY public."контрагенты".id;


--
-- Name: маркетплейсы; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."маркетплейсы" (
    id integer NOT NULL,
    code character varying(50),
    name character varying(100)
);


ALTER TABLE public."маркетплейсы" OWNER TO postgres;

--
-- Name: маркетплейсы_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."маркетплейсы_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."маркетплейсы_id_seq" OWNER TO postgres;

--
-- Name: маркетплейсы_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."маркетплейсы_id_seq" OWNED BY public."маркетплейсы".id;


--
-- Name: медиа_файлы; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."медиа_файлы" (
    id integer NOT NULL,
    company_id integer,
    url text,
    type character varying(20),
    file_size integer,
    owner_type character varying(30),
    owner_id integer,
    created_at timestamp with time zone
);


ALTER TABLE public."медиа_файлы" OWNER TO postgres;

--
-- Name: медиа_файлы_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."медиа_файлы_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."медиа_файлы_id_seq" OWNER TO postgres;

--
-- Name: медиа_файлы_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."медиа_файлы_id_seq" OWNED BY public."медиа_файлы".id;


--
-- Name: места_хранения; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."места_хранения" (
    id integer NOT NULL,
    company_id integer,
    parent_id integer,
    type character varying(20),
    code character varying(100),
    qr_code_value character varying(200),
    barcode_value character varying(200),
    description text
);


ALTER TABLE public."места_хранения" OWNER TO postgres;

--
-- Name: места_хранения_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."места_хранения_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."места_хранения_id_seq" OWNER TO postgres;

--
-- Name: места_хранения_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."места_хранения_id_seq" OWNED BY public."места_хранения".id;


--
-- Name: остатки_запчастей; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."остатки_запчастей" (
    id integer NOT NULL,
    part_id integer,
    location_id integer,
    status character varying(20),
    quantity integer,
    created_at timestamp with time zone,
    moved_at timestamp with time zone
);


ALTER TABLE public."остатки_запчастей" OWNER TO postgres;

--
-- Name: остатки_запчастей_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."остатки_запчастей_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."остатки_запчастей_id_seq" OWNER TO postgres;

--
-- Name: остатки_запчастей_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."остатки_запчастей_id_seq" OWNED BY public."остатки_запчастей".id;


--
-- Name: платежи; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."платежи" (
    id integer NOT NULL,
    company_id integer,
    deal_id integer,
    provider character varying(50),
    amount numeric(12,2),
    currency character varying(10),
    paid_at timestamp with time zone,
    status character varying(20),
    provider_payment_id character varying(200),
    created_at timestamp with time zone
);


ALTER TABLE public."платежи" OWNER TO postgres;

--
-- Name: платежи_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."платежи_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."платежи_id_seq" OWNER TO postgres;

--
-- Name: платежи_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."платежи_id_seq" OWNED BY public."платежи".id;


--
-- Name: подписки_компаний; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."подписки_компаний" (
    id integer NOT NULL,
    company_id integer,
    tariff_plan_id integer,
    start_at timestamp with time zone,
    end_at timestamp with time zone,
    status character varying(20),
    own_sales_team boolean,
    sales_team_model character varying(30),
    created_at timestamp with time zone
);


ALTER TABLE public."подписки_компаний" OWNER TO postgres;

--
-- Name: подписки_компаний_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."подписки_компаний_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."подписки_компаний_id_seq" OWNER TO postgres;

--
-- Name: подписки_компаний_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."подписки_компаний_id_seq" OWNED BY public."подписки_компаний".id;


--
-- Name: позиции_сделки; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."позиции_сделки" (
    id integer NOT NULL,
    deal_id integer,
    part_id integer,
    quantity integer,
    price numeric(12,2),
    cost numeric(12,2),
    reserved_from timestamp with time zone,
    reserved_until timestamp with time zone,
    reservation_status character varying(20)
);


ALTER TABLE public."позиции_сделки" OWNER TO postgres;

--
-- Name: позиции_сделки_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."позиции_сделки_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."позиции_сделки_id_seq" OWNER TO postgres;

--
-- Name: позиции_сделки_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."позиции_сделки_id_seq" OWNED BY public."позиции_сделки".id;


--
-- Name: права_ролей; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."права_ролей" (
    id integer NOT NULL,
    role_id integer,
    permission_code character varying(100)
);


ALTER TABLE public."права_ролей" OWNER TO postgres;

--
-- Name: права_ролей_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."права_ролей_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."права_ролей_id_seq" OWNER TO postgres;

--
-- Name: права_ролей_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."права_ролей_id_seq" OWNED BY public."права_ролей".id;


--
-- Name: роли; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."роли" (
    id integer NOT NULL,
    company_id integer,
    name character varying(100),
    is_system_default boolean
);


ALTER TABLE public."роли" OWNER TO postgres;

--
-- Name: роли_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."роли_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."роли_id_seq" OWNER TO postgres;

--
-- Name: роли_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."роли_id_seq" OWNED BY public."роли".id;


--
-- Name: роли_сотрудников; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."роли_сотрудников" (
    employee_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public."роли_сотрудников" OWNER TO postgres;

--
-- Name: TABLE "роли_сотрудников"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."роли_сотрудников" IS 'PK составной';


--
-- Name: сайты_компаний; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."сайты_компаний" (
    id integer NOT NULL,
    company_id integer,
    subdomain character varying(150),
    theme character varying(20),
    is_active boolean,
    settings_json jsonb
);


ALTER TABLE public."сайты_компаний" OWNER TO postgres;

--
-- Name: сайты_компаний_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."сайты_компаний_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."сайты_компаний_id_seq" OWNER TO postgres;

--
-- Name: сайты_компаний_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."сайты_компаний_id_seq" OWNED BY public."сайты_компаний".id;


--
-- Name: сделки; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."сделки" (
    id integer NOT NULL,
    company_id integer,
    counterparty_id integer,
    responsible_employee_id integer,
    stage character varying(30),
    total_amount numeric(12,2),
    total_cost numeric(12,2),
    profit numeric(12,2),
    source character varying(50),
    created_at timestamp with time zone,
    closed_at timestamp with time zone
);


ALTER TABLE public."сделки" OWNER TO postgres;

--
-- Name: сделки_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."сделки_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."сделки_id_seq" OWNER TO postgres;

--
-- Name: сделки_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."сделки_id_seq" OWNED BY public."сделки".id;


--
-- Name: сообщения; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."сообщения" (
    id integer NOT NULL,
    conversation_id integer,
    sender_type character varying(30),
    employee_id integer,
    text text,
    attachments_json jsonb,
    sent_at timestamp with time zone
);


ALTER TABLE public."сообщения" OWNER TO postgres;

--
-- Name: сообщения_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."сообщения_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."сообщения_id_seq" OWNER TO postgres;

--
-- Name: сообщения_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."сообщения_id_seq" OWNED BY public."сообщения".id;


--
-- Name: сотрудники; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."сотрудники" (
    id integer NOT NULL,
    company_id integer,
    full_name character varying(200),
    phone character varying(50),
    email character varying(150),
    "position" character varying(100),
    pin_code_hash character varying(255),
    is_active boolean,
    created_at timestamp with time zone,
    last_login_at timestamp with time zone
);


ALTER TABLE public."сотрудники" OWNER TO postgres;

--
-- Name: сотрудники_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."сотрудники_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."сотрудники_id_seq" OWNER TO postgres;

--
-- Name: сотрудники_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."сотрудники_id_seq" OWNED BY public."сотрудники".id;


--
-- Name: тарифные_планы; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."тарифные_планы" (
    id integer NOT NULL,
    code character varying(50),
    name character varying(100),
    price_month numeric(12,2),
    description text,
    settings_json jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public."тарифные_планы" OWNER TO postgres;

--
-- Name: тарифные_планы_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."тарифные_планы_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."тарифные_планы_id_seq" OWNER TO postgres;

--
-- Name: тарифные_планы_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."тарифные_планы_id_seq" OWNED BY public."тарифные_планы".id;


--
-- Name: товары_на_маркетплейсах; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."товары_на_маркетплейсах" (
    id integer NOT NULL,
    company_marketplace_account_id integer,
    part_id integer,
    external_product_id character varying(200),
    listing_url text,
    status character varying(20)
);


ALTER TABLE public."товары_на_маркетплейсах" OWNER TO postgres;

--
-- Name: товары_на_маркетплейсах_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."товары_на_маркетплейсах_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."товары_на_маркетплейсах_id_seq" OWNER TO postgres;

--
-- Name: товары_на_маркетплейсах_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."товары_на_маркетплейсах_id_seq" OWNED BY public."товары_на_маркетплейсах".id;


--
-- Name: фото_запчастей; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."фото_запчастей" (
    id integer NOT NULL,
    part_id integer,
    media_file_id integer,
    is_main boolean,
    has_defect_mark boolean,
    has_watermark boolean,
    background_removed boolean
);


ALTER TABLE public."фото_запчастей" OWNER TO postgres;

--
-- Name: фото_запчастей_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."фото_запчастей_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."фото_запчастей_id_seq" OWNER TO postgres;

--
-- Name: фото_запчастей_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."фото_запчастей_id_seq" OWNED BY public."фото_запчастей".id;


--
-- Name: чеки; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."чеки" (
    id integer NOT NULL,
    payment_id integer,
    atol_receipt_id character varying(200),
    receipt_url text,
    sent_to character varying(150),
    sent_via character varying(20),
    created_at timestamp with time zone
);


ALTER TABLE public."чеки" OWNER TO postgres;

--
-- Name: чеки_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."чеки_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."чеки_id_seq" OWNER TO postgres;

--
-- Name: чеки_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."чеки_id_seq" OWNED BY public."чеки".id;


--
-- Name: авто_доноры id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."авто_доноры" ALTER COLUMN id SET DEFAULT nextval('public."авто_доноры_id_seq"'::regclass);


--
-- Name: аккаунты_компании_на_маркетплейса id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."аккаунты_компании_на_маркетплейса" ALTER COLUMN id SET DEFAULT nextval('public."аккаунты_компании_на_маркетпл_id_seq"'::regclass);


--
-- Name: движения_денег id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег" ALTER COLUMN id SET DEFAULT nextval('public."движения_денег_id_seq"'::regclass);


--
-- Name: диалоги id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги" ALTER COLUMN id SET DEFAULT nextval('public."диалоги_id_seq"'::regclass);


--
-- Name: журналы_аудита id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."журналы_аудита" ALTER COLUMN id SET DEFAULT nextval('public."журналы_аудита_id_seq"'::regclass);


--
-- Name: задачи id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи" ALTER COLUMN id SET DEFAULT nextval('public."задачи_id_seq"'::regclass);


--
-- Name: заказы_маркетплейсов id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_маркетплейсов" ALTER COLUMN id SET DEFAULT nextval('public."заказы_маркетплейсов_id_seq"'::regclass);


--
-- Name: заказы_с_сайта id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта" ALTER COLUMN id SET DEFAULT nextval('public."заказы_с_сайта_id_seq"'::regclass);


--
-- Name: запчасти id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."запчасти" ALTER COLUMN id SET DEFAULT nextval('public."запчасти_id_seq"'::regclass);


--
-- Name: звонки id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки" ALTER COLUMN id SET DEFAULT nextval('public."звонки_id_seq"'::regclass);


--
-- Name: каналы_коммуникации id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."каналы_коммуникации" ALTER COLUMN id SET DEFAULT nextval('public."каналы_коммуникации_id_seq"'::regclass);


--
-- Name: категории_движения_денег id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."категории_движения_денег" ALTER COLUMN id SET DEFAULT nextval('public."категории_движения_денег_id_seq"'::regclass);


--
-- Name: компании id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."компании" ALTER COLUMN id SET DEFAULT nextval('public."компании_id_seq"'::regclass);


--
-- Name: контрагенты id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."контрагенты" ALTER COLUMN id SET DEFAULT nextval('public."контрагенты_id_seq"'::regclass);


--
-- Name: маркетплейсы id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."маркетплейсы" ALTER COLUMN id SET DEFAULT nextval('public."маркетплейсы_id_seq"'::regclass);


--
-- Name: медиа_файлы id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."медиа_файлы" ALTER COLUMN id SET DEFAULT nextval('public."медиа_файлы_id_seq"'::regclass);


--
-- Name: места_хранения id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."места_хранения" ALTER COLUMN id SET DEFAULT nextval('public."места_хранения_id_seq"'::regclass);


--
-- Name: остатки_запчастей id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."остатки_запчастей" ALTER COLUMN id SET DEFAULT nextval('public."остатки_запчастей_id_seq"'::regclass);


--
-- Name: платежи id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."платежи" ALTER COLUMN id SET DEFAULT nextval('public."платежи_id_seq"'::regclass);


--
-- Name: подписки_компаний id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."подписки_компаний" ALTER COLUMN id SET DEFAULT nextval('public."подписки_компаний_id_seq"'::regclass);


--
-- Name: позиции_сделки id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."позиции_сделки" ALTER COLUMN id SET DEFAULT nextval('public."позиции_сделки_id_seq"'::regclass);


--
-- Name: права_ролей id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."права_ролей" ALTER COLUMN id SET DEFAULT nextval('public."права_ролей_id_seq"'::regclass);


--
-- Name: роли id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли" ALTER COLUMN id SET DEFAULT nextval('public."роли_id_seq"'::regclass);


--
-- Name: сайты_компаний id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сайты_компаний" ALTER COLUMN id SET DEFAULT nextval('public."сайты_компаний_id_seq"'::regclass);


--
-- Name: сделки id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки" ALTER COLUMN id SET DEFAULT nextval('public."сделки_id_seq"'::regclass);


--
-- Name: сообщения id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сообщения" ALTER COLUMN id SET DEFAULT nextval('public."сообщения_id_seq"'::regclass);


--
-- Name: сотрудники id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сотрудники" ALTER COLUMN id SET DEFAULT nextval('public."сотрудники_id_seq"'::regclass);


--
-- Name: тарифные_планы id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."тарифные_планы" ALTER COLUMN id SET DEFAULT nextval('public."тарифные_планы_id_seq"'::regclass);


--
-- Name: товары_на_маркетплейсах id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."товары_на_маркетплейсах" ALTER COLUMN id SET DEFAULT nextval('public."товары_на_маркетплейсах_id_seq"'::regclass);


--
-- Name: фото_запчастей id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."фото_запчастей" ALTER COLUMN id SET DEFAULT nextval('public."фото_запчастей_id_seq"'::regclass);


--
-- Name: чеки id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."чеки" ALTER COLUMN id SET DEFAULT nextval('public."чеки_id_seq"'::regclass);


--
-- Name: авто_доноры авто_доноры_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."авто_доноры"
    ADD CONSTRAINT "авто_доноры_pkey" PRIMARY KEY (id);


--
-- Name: аккаунты_компании_на_маркетплейса аккаунты_компании_на_маркетпле_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."аккаунты_компании_на_маркетплейса"
    ADD CONSTRAINT "аккаунты_компании_на_маркетпле_pkey" PRIMARY KEY (id);


--
-- Name: движения_денег движения_денег_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_pkey" PRIMARY KEY (id);


--
-- Name: диалоги диалоги_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги"
    ADD CONSTRAINT "диалоги_pkey" PRIMARY KEY (id);


--
-- Name: журналы_аудита журналы_аудита_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."журналы_аудита"
    ADD CONSTRAINT "журналы_аудита_pkey" PRIMARY KEY (id);


--
-- Name: задачи задачи_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи"
    ADD CONSTRAINT "задачи_pkey" PRIMARY KEY (id);


--
-- Name: заказы_маркетплейсов заказы_маркетплейсов_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_маркетплейсов"
    ADD CONSTRAINT "заказы_маркетплейсов_pkey" PRIMARY KEY (id);


--
-- Name: заказы_с_сайта заказы_с_сайта_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_pkey" PRIMARY KEY (id);


--
-- Name: запчасти запчасти_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."запчасти"
    ADD CONSTRAINT "запчасти_pkey" PRIMARY KEY (id);


--
-- Name: звонки звонки_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_pkey" PRIMARY KEY (id);


--
-- Name: каналы_коммуникации каналы_коммуникации_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."каналы_коммуникации"
    ADD CONSTRAINT "каналы_коммуникации_pkey" PRIMARY KEY (id);


--
-- Name: категории_движения_денег категории_движения_денег_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."категории_движения_денег"
    ADD CONSTRAINT "категории_движения_денег_pkey" PRIMARY KEY (id);


--
-- Name: компании компании_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."компании"
    ADD CONSTRAINT "компании_pkey" PRIMARY KEY (id);


--
-- Name: контрагенты контрагенты_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."контрагенты"
    ADD CONSTRAINT "контрагенты_pkey" PRIMARY KEY (id);


--
-- Name: маркетплейсы маркетплейсы_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."маркетплейсы"
    ADD CONSTRAINT "маркетплейсы_pkey" PRIMARY KEY (id);


--
-- Name: медиа_файлы медиа_файлы_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."медиа_файлы"
    ADD CONSTRAINT "медиа_файлы_pkey" PRIMARY KEY (id);


--
-- Name: места_хранения места_хранения_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."места_хранения"
    ADD CONSTRAINT "места_хранения_pkey" PRIMARY KEY (id);


--
-- Name: остатки_запчастей остатки_запчастей_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."остатки_запчастей"
    ADD CONSTRAINT "остатки_запчастей_pkey" PRIMARY KEY (id);


--
-- Name: платежи платежи_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."платежи"
    ADD CONSTRAINT "платежи_pkey" PRIMARY KEY (id);


--
-- Name: подписки_компаний подписки_компаний_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."подписки_компаний"
    ADD CONSTRAINT "подписки_компаний_pkey" PRIMARY KEY (id);


--
-- Name: позиции_сделки позиции_сделки_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."позиции_сделки"
    ADD CONSTRAINT "позиции_сделки_pkey" PRIMARY KEY (id);


--
-- Name: права_ролей права_ролей_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."права_ролей"
    ADD CONSTRAINT "права_ролей_pkey" PRIMARY KEY (id);


--
-- Name: роли роли_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли"
    ADD CONSTRAINT "роли_pkey" PRIMARY KEY (id);


--
-- Name: роли_сотрудников роли_сотрудников_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли_сотрудников"
    ADD CONSTRAINT "роли_сотрудников_pkey" PRIMARY KEY (employee_id, role_id);


--
-- Name: сайты_компаний сайты_компаний_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сайты_компаний"
    ADD CONSTRAINT "сайты_компаний_pkey" PRIMARY KEY (id);


--
-- Name: сделки сделки_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки"
    ADD CONSTRAINT "сделки_pkey" PRIMARY KEY (id);


--
-- Name: сообщения сообщения_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сообщения"
    ADD CONSTRAINT "сообщения_pkey" PRIMARY KEY (id);


--
-- Name: сотрудники сотрудники_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сотрудники"
    ADD CONSTRAINT "сотрудники_pkey" PRIMARY KEY (id);


--
-- Name: тарифные_планы тарифные_планы_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."тарифные_планы"
    ADD CONSTRAINT "тарифные_планы_pkey" PRIMARY KEY (id);


--
-- Name: товары_на_маркетплейсах товары_на_маркетплейсах_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."товары_на_маркетплейсах"
    ADD CONSTRAINT "товары_на_маркетплейсах_pkey" PRIMARY KEY (id);


--
-- Name: фото_запчастей фото_запчастей_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."фото_запчастей"
    ADD CONSTRAINT "фото_запчастей_pkey" PRIMARY KEY (id);


--
-- Name: чеки чеки_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."чеки"
    ADD CONSTRAINT "чеки_pkey" PRIMARY KEY (id);


--
-- Name: авто_доноры авто_доноры_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."авто_доноры"
    ADD CONSTRAINT "авто_доноры_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: авто_доноры авто_доноры_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."авто_доноры"
    ADD CONSTRAINT "авто_доноры_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: аккаунты_компании_на_маркетплейса аккаунты_компании_на_м_marketplace_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."аккаунты_компании_на_маркетплейса"
    ADD CONSTRAINT "аккаунты_компании_на_м_marketplace_id_fkey1" FOREIGN KEY (marketplace_id) REFERENCES public."маркетплейсы"(id);


--
-- Name: аккаунты_компании_на_маркетплейса аккаунты_компании_на_ма_marketplace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."аккаунты_компании_на_маркетплейса"
    ADD CONSTRAINT "аккаунты_компании_на_ма_marketplace_id_fkey" FOREIGN KEY (marketplace_id) REFERENCES public."маркетплейсы"(id);


--
-- Name: аккаунты_компании_на_маркетплейса аккаунты_компании_на_мар_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."аккаунты_компании_на_маркетплейса"
    ADD CONSTRAINT "аккаунты_компании_на_мар_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: аккаунты_компании_на_маркетплейса аккаунты_компании_на_марк_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."аккаунты_компании_на_маркетплейса"
    ADD CONSTRAINT "аккаунты_компании_на_марк_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: движения_денег движения_денег_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."категории_движения_денег"(id);


--
-- Name: движения_денег движения_денег_category_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_category_id_fkey1" FOREIGN KEY (category_id) REFERENCES public."категории_движения_денег"(id);


--
-- Name: движения_денег движения_денег_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: движения_денег движения_денег_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: движения_денег движения_денег_created_by_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_created_by_employee_id_fkey" FOREIGN KEY (created_by_employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: движения_денег движения_денег_created_by_employee_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_created_by_employee_id_fkey1" FOREIGN KEY (created_by_employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: движения_денег движения_денег_related_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_related_deal_id_fkey" FOREIGN KEY (related_deal_id) REFERENCES public."сделки"(id);


--
-- Name: движения_денег движения_денег_related_deal_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."движения_денег"
    ADD CONSTRAINT "движения_денег_related_deal_id_fkey1" FOREIGN KEY (related_deal_id) REFERENCES public."сделки"(id);


--
-- Name: диалоги диалоги_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги"
    ADD CONSTRAINT "диалоги_channel_id_fkey" FOREIGN KEY (channel_id) REFERENCES public."каналы_коммуникации"(id);


--
-- Name: диалоги диалоги_channel_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги"
    ADD CONSTRAINT "диалоги_channel_id_fkey1" FOREIGN KEY (channel_id) REFERENCES public."каналы_коммуникации"(id);


--
-- Name: диалоги диалоги_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги"
    ADD CONSTRAINT "диалоги_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: диалоги диалоги_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги"
    ADD CONSTRAINT "диалоги_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: диалоги диалоги_counterparty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги"
    ADD CONSTRAINT "диалоги_counterparty_id_fkey" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: диалоги диалоги_counterparty_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."диалоги"
    ADD CONSTRAINT "диалоги_counterparty_id_fkey1" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: журналы_аудита журналы_аудита_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."журналы_аудита"
    ADD CONSTRAINT "журналы_аудита_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: журналы_аудита журналы_аудита_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."журналы_аудита"
    ADD CONSTRAINT "журналы_аудита_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: журналы_аудита журналы_аудита_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."журналы_аудита"
    ADD CONSTRAINT "журналы_аудита_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: журналы_аудита журналы_аудита_employee_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."журналы_аудита"
    ADD CONSTRAINT "журналы_аудита_employee_id_fkey1" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: задачи задачи_assignee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи"
    ADD CONSTRAINT "задачи_assignee_id_fkey" FOREIGN KEY (assignee_id) REFERENCES public."сотрудники"(id);


--
-- Name: задачи задачи_assignee_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи"
    ADD CONSTRAINT "задачи_assignee_id_fkey1" FOREIGN KEY (assignee_id) REFERENCES public."сотрудники"(id);


--
-- Name: задачи задачи_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи"
    ADD CONSTRAINT "задачи_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: задачи задачи_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи"
    ADD CONSTRAINT "задачи_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: задачи задачи_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи"
    ADD CONSTRAINT "задачи_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES public."сотрудники"(id);


--
-- Name: задачи задачи_creator_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."задачи"
    ADD CONSTRAINT "задачи_creator_id_fkey1" FOREIGN KEY (creator_id) REFERENCES public."сотрудники"(id);


--
-- Name: заказы_маркетплейсов заказы_маркетп_company_marketplace_account__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_маркетплейсов"
    ADD CONSTRAINT "заказы_маркетп_company_marketplace_account__fkey1" FOREIGN KEY (company_marketplace_account_id) REFERENCES public."аккаунты_компании_на_маркетплейса"(id);


--
-- Name: заказы_маркетплейсов заказы_маркетпл_company_marketplace_account__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_маркетплейсов"
    ADD CONSTRAINT "заказы_маркетпл_company_marketplace_account__fkey" FOREIGN KEY (company_marketplace_account_id) REFERENCES public."аккаунты_компании_на_маркетплейса"(id);


--
-- Name: заказы_маркетплейсов заказы_маркетплейсов_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_маркетплейсов"
    ADD CONSTRAINT "заказы_маркетплейсов_deal_id_fkey" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: заказы_маркетплейсов заказы_маркетплейсов_deal_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_маркетплейсов"
    ADD CONSTRAINT "заказы_маркетплейсов_deal_id_fkey1" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_counterparty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_counterparty_id_fkey" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_counterparty_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_counterparty_id_fkey1" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_deal_id_fkey" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_deal_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_deal_id_fkey1" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_part_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_part_id_fkey" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: заказы_с_сайта заказы_с_сайта_part_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."заказы_с_сайта"
    ADD CONSTRAINT "заказы_с_сайта_part_id_fkey1" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: запчасти запчасти_auto_donor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."запчасти"
    ADD CONSTRAINT "запчасти_auto_donor_id_fkey" FOREIGN KEY (auto_donor_id) REFERENCES public."авто_доноры"(id);


--
-- Name: запчасти запчасти_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."запчасти"
    ADD CONSTRAINT "запчасти_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: запчасти запчасти_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."запчасти"
    ADD CONSTRAINT "запчасти_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: звонки звонки_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: звонки звонки_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: звонки звонки_counterparty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_counterparty_id_fkey" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: звонки звонки_counterparty_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_counterparty_id_fkey1" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: звонки звонки_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_deal_id_fkey" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: звонки звонки_deal_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_deal_id_fkey1" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: звонки звонки_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: звонки звонки_employee_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."звонки"
    ADD CONSTRAINT "звонки_employee_id_fkey1" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: категории_движения_денег категории_движения_денег_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."категории_движения_денег"
    ADD CONSTRAINT "категории_движения_денег_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: категории_движения_денег категории_движения_денег_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."категории_движения_денег"
    ADD CONSTRAINT "категории_движения_денег_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: контрагенты контрагенты_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."контрагенты"
    ADD CONSTRAINT "контрагенты_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: контрагенты контрагенты_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."контрагенты"
    ADD CONSTRAINT "контрагенты_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: медиа_файлы медиа_файлы_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."медиа_файлы"
    ADD CONSTRAINT "медиа_файлы_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: медиа_файлы медиа_файлы_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."медиа_файлы"
    ADD CONSTRAINT "медиа_файлы_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: места_хранения места_хранения_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."места_хранения"
    ADD CONSTRAINT "места_хранения_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: места_хранения места_хранения_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."места_хранения"
    ADD CONSTRAINT "места_хранения_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: места_хранения места_хранения_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."места_хранения"
    ADD CONSTRAINT "места_хранения_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public."места_хранения"(id);


--
-- Name: места_хранения места_хранения_parent_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."места_хранения"
    ADD CONSTRAINT "места_хранения_parent_id_fkey1" FOREIGN KEY (parent_id) REFERENCES public."места_хранения"(id);


--
-- Name: остатки_запчастей остатки_запчастей_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."остатки_запчастей"
    ADD CONSTRAINT "остатки_запчастей_location_id_fkey" FOREIGN KEY (location_id) REFERENCES public."места_хранения"(id);


--
-- Name: остатки_запчастей остатки_запчастей_location_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."остатки_запчастей"
    ADD CONSTRAINT "остатки_запчастей_location_id_fkey1" FOREIGN KEY (location_id) REFERENCES public."места_хранения"(id);


--
-- Name: остатки_запчастей остатки_запчастей_part_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."остатки_запчастей"
    ADD CONSTRAINT "остатки_запчастей_part_id_fkey" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: остатки_запчастей остатки_запчастей_part_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."остатки_запчастей"
    ADD CONSTRAINT "остатки_запчастей_part_id_fkey1" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: платежи платежи_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."платежи"
    ADD CONSTRAINT "платежи_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: платежи платежи_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."платежи"
    ADD CONSTRAINT "платежи_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: платежи платежи_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."платежи"
    ADD CONSTRAINT "платежи_deal_id_fkey" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: платежи платежи_deal_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."платежи"
    ADD CONSTRAINT "платежи_deal_id_fkey1" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: подписки_компаний подписки_компаний_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."подписки_компаний"
    ADD CONSTRAINT "подписки_компаний_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: подписки_компаний подписки_компаний_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."подписки_компаний"
    ADD CONSTRAINT "подписки_компаний_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: подписки_компаний подписки_компаний_tariff_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."подписки_компаний"
    ADD CONSTRAINT "подписки_компаний_tariff_plan_id_fkey" FOREIGN KEY (tariff_plan_id) REFERENCES public."тарифные_планы"(id);


--
-- Name: подписки_компаний подписки_компаний_tariff_plan_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."подписки_компаний"
    ADD CONSTRAINT "подписки_компаний_tariff_plan_id_fkey1" FOREIGN KEY (tariff_plan_id) REFERENCES public."тарифные_планы"(id);


--
-- Name: позиции_сделки позиции_сделки_deal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."позиции_сделки"
    ADD CONSTRAINT "позиции_сделки_deal_id_fkey" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: позиции_сделки позиции_сделки_deal_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."позиции_сделки"
    ADD CONSTRAINT "позиции_сделки_deal_id_fkey1" FOREIGN KEY (deal_id) REFERENCES public."сделки"(id);


--
-- Name: позиции_сделки позиции_сделки_part_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."позиции_сделки"
    ADD CONSTRAINT "позиции_сделки_part_id_fkey" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: позиции_сделки позиции_сделки_part_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."позиции_сделки"
    ADD CONSTRAINT "позиции_сделки_part_id_fkey1" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: права_ролей права_ролей_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."права_ролей"
    ADD CONSTRAINT "права_ролей_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."роли"(id);


--
-- Name: права_ролей права_ролей_role_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."права_ролей"
    ADD CONSTRAINT "права_ролей_role_id_fkey1" FOREIGN KEY (role_id) REFERENCES public."роли"(id);


--
-- Name: роли роли_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли"
    ADD CONSTRAINT "роли_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: роли роли_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли"
    ADD CONSTRAINT "роли_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: роли_сотрудников роли_сотрудников_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли_сотрудников"
    ADD CONSTRAINT "роли_сотрудников_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: роли_сотрудников роли_сотрудников_employee_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли_сотрудников"
    ADD CONSTRAINT "роли_сотрудников_employee_id_fkey1" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: роли_сотрудников роли_сотрудников_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли_сотрудников"
    ADD CONSTRAINT "роли_сотрудников_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."роли"(id);


--
-- Name: роли_сотрудников роли_сотрудников_role_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."роли_сотрудников"
    ADD CONSTRAINT "роли_сотрудников_role_id_fkey1" FOREIGN KEY (role_id) REFERENCES public."роли"(id);


--
-- Name: сайты_компаний сайты_компаний_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сайты_компаний"
    ADD CONSTRAINT "сайты_компаний_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: сайты_компаний сайты_компаний_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сайты_компаний"
    ADD CONSTRAINT "сайты_компаний_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: сделки сделки_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки"
    ADD CONSTRAINT "сделки_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: сделки сделки_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки"
    ADD CONSTRAINT "сделки_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: сделки сделки_counterparty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки"
    ADD CONSTRAINT "сделки_counterparty_id_fkey" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: сделки сделки_counterparty_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки"
    ADD CONSTRAINT "сделки_counterparty_id_fkey1" FOREIGN KEY (counterparty_id) REFERENCES public."контрагенты"(id);


--
-- Name: сделки сделки_responsible_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки"
    ADD CONSTRAINT "сделки_responsible_employee_id_fkey" FOREIGN KEY (responsible_employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: сделки сделки_responsible_employee_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сделки"
    ADD CONSTRAINT "сделки_responsible_employee_id_fkey1" FOREIGN KEY (responsible_employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: сообщения сообщения_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сообщения"
    ADD CONSTRAINT "сообщения_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public."диалоги"(id);


--
-- Name: сообщения сообщения_conversation_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сообщения"
    ADD CONSTRAINT "сообщения_conversation_id_fkey1" FOREIGN KEY (conversation_id) REFERENCES public."диалоги"(id);


--
-- Name: сообщения сообщения_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сообщения"
    ADD CONSTRAINT "сообщения_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: сообщения сообщения_employee_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сообщения"
    ADD CONSTRAINT "сообщения_employee_id_fkey1" FOREIGN KEY (employee_id) REFERENCES public."сотрудники"(id);


--
-- Name: сотрудники сотрудники_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сотрудники"
    ADD CONSTRAINT "сотрудники_company_id_fkey" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: сотрудники сотрудники_company_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."сотрудники"
    ADD CONSTRAINT "сотрудники_company_id_fkey1" FOREIGN KEY (company_id) REFERENCES public."компании"(id);


--
-- Name: товары_на_маркетплейсах товары_на_марке_company_marketplace_account__fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."товары_на_маркетплейсах"
    ADD CONSTRAINT "товары_на_марке_company_marketplace_account__fkey" FOREIGN KEY (company_marketplace_account_id) REFERENCES public."аккаунты_компании_на_маркетплейса"(id);


--
-- Name: товары_на_маркетплейсах товары_на_марке_company_marketplace_account__fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."товары_на_маркетплейсах"
    ADD CONSTRAINT "товары_на_марке_company_marketplace_account__fkey1" FOREIGN KEY (company_marketplace_account_id) REFERENCES public."аккаунты_компании_на_маркетплейса"(id);


--
-- Name: товары_на_маркетплейсах товары_на_маркетплейсах_part_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."товары_на_маркетплейсах"
    ADD CONSTRAINT "товары_на_маркетплейсах_part_id_fkey" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: товары_на_маркетплейсах товары_на_маркетплейсах_part_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."товары_на_маркетплейсах"
    ADD CONSTRAINT "товары_на_маркетплейсах_part_id_fkey1" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: фото_запчастей фото_запчастей_media_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."фото_запчастей"
    ADD CONSTRAINT "фото_запчастей_media_file_id_fkey" FOREIGN KEY (media_file_id) REFERENCES public."медиа_файлы"(id);


--
-- Name: фото_запчастей фото_запчастей_media_file_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."фото_запчастей"
    ADD CONSTRAINT "фото_запчастей_media_file_id_fkey1" FOREIGN KEY (media_file_id) REFERENCES public."медиа_файлы"(id);


--
-- Name: фото_запчастей фото_запчастей_part_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."фото_запчастей"
    ADD CONSTRAINT "фото_запчастей_part_id_fkey" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: фото_запчастей фото_запчастей_part_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."фото_запчастей"
    ADD CONSTRAINT "фото_запчастей_part_id_fkey1" FOREIGN KEY (part_id) REFERENCES public."запчасти"(id);


--
-- Name: чеки чеки_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."чеки"
    ADD CONSTRAINT "чеки_payment_id_fkey" FOREIGN KEY (payment_id) REFERENCES public."платежи"(id);


--
-- Name: чеки чеки_payment_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."чеки"
    ADD CONSTRAINT "чеки_payment_id_fkey1" FOREIGN KEY (payment_id) REFERENCES public."платежи"(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 3O3PkrD0PqE0wdrZhFNUeDlDppeLTQqNsgV19JRKeEvbYSpOkqqkSdAEQ3DG9BI

