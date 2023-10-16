import Heading from "@/Components/UI/Heading/Heading";
import Paragraph from "@/Components/UI/Paragraph/Paragraph";
import HeadingTypeEnum from "@/utils/enums/heading-type.enum";
import ParagraphTypeEnum from "@/utils/enums/paragraph-type.enum";

const ReadMe = () => {
  return (
    <div className="p-6 md:p-8 flex gap-2 flex-col">
      <Heading type={HeadingTypeEnum.h2_Small}>Instructions:</Heading>
      <ul className="flex flex-col gap-4">
        <li>
          <Paragraph type={ParagraphTypeEnum.p1_Small}>
            Sinhronizirano preklop videoposnetka, brisanje videoposnetka,
            dodajanje videoposnetka, zaustavitev videa. Glasnost videa ni
            sinhronizirana.
          </Paragraph>
        </li>
        <li>
          <Paragraph type={ParagraphTypeEnum.p1_Small}>
            Videoposnetke, ki so vam všeč, dodajte na seznam priljubljenih, saj
            je število iskalnih klikov v YouTubu omejeno
          </Paragraph>
        </li>
        <li>
          <Paragraph type={ParagraphTypeEnum.p1_Small}>
            Videoposnetka ne previjajte naprej ali nazaj, kajti če videoposnetek
            previjete do konca, se bo video preklopil za vse uporabnike
            spletnega mesta. Obravnavajte ga kot radio in poslušajte tudi videe
            drugih ljudi
          </Paragraph>
        </li>
        <li>
          <Paragraph type={ParagraphTypeEnum.p1_Small}>
            Če najdete kakršne koli napake ali želite nekaj popraviti ali želite
            nekaj dodati ali spremeniti - pišite mi
          </Paragraph>
        </li>
      </ul>
    </div>
  );
};

export default ReadMe;
