import type { Metadata } from "next";
import HeroSectionMidle from "@/components/secciones/HeroSectionMidle";

export const metadata: Metadata = {
  title: "Política de Privacidad y Seguridad | Jisa Adventure",
  description:
    "Tratamiento de datos personales conforme a la Ley N.º 29733. Finalidades, base legal, seguridad, pagos Openpay (PCI DSS) y derechos ARCO.",
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      {/* HERO a pantalla completa (full-bleed) */}
      <section className="full-bleed">
        <HeroSectionMidle
          backgroundImage="/agencia-de-viaje-cusco-jisaadventure.webp"
          title="POLÍTICA DE PRIVACIDAD Y SEGURIDAD DE LA INFORMACIÓN"
          description="Jisa Adventure trata datos personales conforme a la Ley N.º 29733 y su Reglamento. Aquí detallamos finalidades, base legal, seguridad, arquitectura de pagos con Openpay (PCI DSS) y tus derechos ARCO."
        />
      </section>

      {/* Contenido */}
      <section className="w-full max-w-7xl mx-auto mt-12 mb-16 px-4 md:px-6">
        <article className="prose prose-sm md:prose lg:prose-lg max-w-none">
          <h2>1. Identidad y contacto del responsable</h2>
          <p>
            <strong>Responsable:</strong> Jisa Adventure (la “Agencia”).<br />
            <strong>Email privacidad:</strong>{" "}
            <a href="mailto:privacidad@jisaadventure.com">privacidad@jisaadventure.com</a>
            <br />
            <strong>Email seguridad:</strong>{" "}
            <a href="mailto:seguridad@jisaadventure.com">seguridad@jisaadventure.com</a>
            <br />
            <strong>Domicilio:</strong> Cusco, Perú (actualizar con dirección fiscal).
          </p>

          <h2>2. Alcance y marco normativo</h2>
          <p>
            Esta política aplica al sitio web, paneles de administración, APIs (Laravel), frontends
            (React/Next) y canales de atención de Jisa Adventure. Nos regimos por la Ley N.º 29733 y su
            Reglamento. Si operan transferencias internacionales, aplicamos salvaguardas
            contractuales y técnicas adecuadas.
          </p>

          <h2>3. Registro de actividades de tratamiento (RAT) – resumen</h2>
          <ul>
            <li>
              <strong>Reservas y atención:</strong> Identificación y contacto (nombre, apellidos, email,
              teléfono, país ISO-2), datos de viaje y preferencias.
            </li>
            <li>
              <strong>Facturación:</strong> Razón social, RUC/DNI, dirección fiscal, comprobantes.
            </li>
            <li>
              <strong>Pagos:</strong> <u>No almacenamos PAN ni CVV</u>. Procesa Openpay (PCI DSS). Guardamos
              token/ID, importe y estado.
            </li>
            <li>
              <strong>Soporte y seguridad:</strong> IP, user-agent, trazas, auditoría de accesos.
            </li>
          </ul>

          <h2>4. Finalidades y bases legales</h2>
          <ul>
            <li>
              <strong>Ejecución de contrato:</strong> cotizaciones, reservas, pagos, comprobantes.
            </li>
            <li>
              <strong>Obligación legal:</strong> tributaria/contable, requerimientos de autoridad.
            </li>
            <li>
              <strong>Interés legítimo:</strong> seguridad operativa, antifraude, mejora del servicio.
            </li>
            <li>
              <strong>Consentimiento:</strong> marketing y cookies no esenciales.
            </li>
          </ul>

          <h2>5. Arquitectura de pagos y cumplimiento PCI</h2>
          <p>
            Implementamos pagos con <strong>Openpay</strong>. Se recomienda Openpay.js/hosted fields o
            checkout alojado para que los datos de tarjeta se envíen directamente a Openpay y no pasen
            por nuestro backend. Esto reduce el alcance PCI a <strong>SAQ A</strong> (o{" "}
            <strong>SAQ A-EP</strong> según integración).
          </p>
          <ol>
            <li>Los campos de tarjeta los sirve Openpay (iframes/SDK).</li>
            <li>Transmisión cifrada a Openpay (TLS); nosotros recibimos un token/estado.</li>
            <li>Guardamos metadatos (ID, monto, moneda, resultado; nunca PAN completo ni CVV).</li>
            <li>3-D Secure y controles antifraude cuando aplique.</li>
          </ol>

          <details>
            <summary>
              <strong>Controles recomendados en el checkout (técnico)</strong>
            </summary>
            <ul>
              <li>Subresource Integrity (SRI) y versión fija del SDK.</li>
              <li>
                Content-Security-Policy con <code>nonce</code> y dominios de Openpay en listas blancas.
              </li>
              <li>HSTS, X-Frame-Options/Frame-Ancestors, X-Content-Type-Options, Referrer-Policy.</li>
              <li>Monitor de integridad lado-cliente (prevención de skimming).</li>
              <li>Sin claves en el front; variables via backend con rotación y scopes mínimos.</li>
            </ul>
            <pre>{`# NGINX (ejemplo)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Permissions-Policy "geolocation=(), microphone=()" always;
add_header X-Frame-Options "SAMEORIGIN" always;

# CSP (ajusta dominios/SDK de Openpay)
add_header Content-Security-Policy "
  default-src 'self';
  frame-ancestors 'self';
  script-src 'self' 'nonce-__RUNTIME_NONCE__' https://openpay.s3.amazonaws.com https://resources.openpay.mx;
  frame-src https://* openpay.mx openpay.s3.amazonaws.com;
  connect-src 'self' https://api.openpay.mx https://sandbox-api.openpay.mx;
  img-src 'self' data: https:;
  style-src 'self' 'unsafe-inline';
" always;`}</pre>
          </details>

          <h2>6. Medidas de seguridad (organizativas y técnicas)</h2>
          <ul>
            <li>Gobernanza y revisión anual de políticas y RAT.</li>
            <li>MFA, mínimos privilegios y rotación de credenciales.</li>
            <li>TLS 1.2+, cifrado de respaldos y secretos.</li>
            <li>SDLC seguro, SCA, auditoría de endpoints.</li>
            <li>Escaneos SAST/DAST y parcheo oportuno.</li>
            <li>Logs con retención/SIEM y trazabilidad.</li>
            <li>Backups cifrados y DRP (RTO/RPO).</li>
            <li>Acuerdos con proveedores y control de transferencias.</li>
          </ul>

          <h2>7. Conservación y eliminación</h2>
          <p>
            Conservamos datos el tiempo necesario para finalidades y obligaciones legales, luego
            aplicamos borrado seguro o anonimización. Metadatos de pagos se conservan para conciliación
            y contabilidad; nunca CVV ni PAN completo.
          </p>

          <h2>8. Derechos ARCO y canales</h2>
          <p>
            Puedes ejercer Acceso, Rectificación, Cancelación y Oposición (ARCO) o retirar tu
            consentimiento. Escríbenos a{" "}
            <a href="mailto:privacidad@jisaadventure.com">privacidad@jisaadventure.com</a>. Si no estás
            conforme, puedes acudir a la Autoridad Nacional de Protección de Datos Personales.
          </p>

          <h2>9. Cookies y tecnologías similares</h2>
          <p>
            Usamos cookies necesarias y, con tu consentimiento, analíticas/personalización. Gestiona
            preferencias desde el banner o tu navegador. Consulta la{" "}
            <a href="/politica-de-cookies">Política de Cookies</a>.
          </p>

          <h2>10. Gestión de incidentes</h2>
          <ul>
            <li>Contención, erradicación, recuperación y lecciones aprendidas.</li>
            <li>Notificación a titulares/autoridad cuando corresponda.</li>
            <li>Registro con causa raíz, alcance y medidas correctivas.</li>
          </ul>

          <h2>11. Transferencias internacionales</h2>
          <p>
            Si intervienen proveedores fuera de Perú (hosting, pasarela de pagos), aplicamos salvaguardas
            contractuales y técnicas adecuadas.
          </p>

          <h2>12. Cambios a esta política</h2>
          <p>Podemos actualizar esta política; la versión vigente se publica en este enlace.</p>
          <p>
            <em>Última actualización: 02/09/2025.</em>
          </p>
        </article>
      </section>
    </>
  );
}