import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import { textAlign } from "@mui/system";

const LinkStyled = styled(Link)(() => ({
  textAlign: "center",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/dashboard">
      <Image src="/images/logos/LogoHTrans.png" alt="logo" height={40} width={190} priority />
    </LinkStyled>
  );
};

export default Logo;
