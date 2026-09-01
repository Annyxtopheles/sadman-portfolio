
ALTER TABLE public.matrimony_attempts DROP CONSTRAINT matrimony_attempts_pkey;
ALTER TABLE public.matrimony_attempts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.matrimony_attempts ALTER COLUMN id TYPE bigint USING NULL;
CREATE SEQUENCE public.matrimony_attempts_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.matrimony_attempts_id_seq OWNED BY public.matrimony_attempts.id;
ALTER TABLE ONLY public.matrimony_attempts ALTER COLUMN id SET DEFAULT nextval('public.matrimony_attempts_id_seq'::regclass);
ALTER TABLE public.matrimony_attempts ADD CONSTRAINT matrimony_attempts_pkey PRIMARY KEY (id);
GRANT USAGE, SELECT ON SEQUENCE public.matrimony_attempts_id_seq TO authenticated, anon, service_role;
