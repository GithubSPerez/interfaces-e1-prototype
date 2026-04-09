import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return <Link href="/"><Image
          className=""
          src="/logo.png"
          alt="Next.js logo"
          width={170}
          height={20}
          priority
        />
        </Link>
} 