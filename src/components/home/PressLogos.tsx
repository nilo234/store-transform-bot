import { motion } from 'framer-motion';

const pressLogos = [
  { name: 'Forbes', display: 'FORBES' },
  { name: 'Healthline', display: 'Healthline' },
  { name: 'Well+Good', display: 'Well+Good' },
  { name: 'Men\'s Health', display: "MEN'S HEALTH" },
  { name: 'Shape', display: 'SHAPE' },
];

export function PressLogos() {
  return (
    <section className="py-10 bg-muted/30 border-y border-border/50">
      <div className="container-wide">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            As Featured In
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {pressLogos.map((logo, index) => (
            <motion.span
              key={logo.name}
              className="text-lg md:text-xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {logo.display}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
