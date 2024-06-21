import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const trigger = async () => {
    await prisma.$executeRaw`
        CREATE OR REPLACE FUNCTION notify_number_changes() RETURNS trigger AS $$
        BEGIN
          PERFORM pg_notify('number_changes', NEW.id::text);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `;

    // Create the trigger on the Number table
    await prisma.$executeRaw`
            CREATE TRIGGER number_changes_trigger
            AFTER INSERT OR UPDATE OR DELETE ON "number"
            FOR EACH ROW EXECUTE FUNCTION notify_number_changes();
          `;
};

export default trigger;
