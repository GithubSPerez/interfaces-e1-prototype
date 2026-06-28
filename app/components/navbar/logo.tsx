import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter()
  
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