import { zColor } from '@remotion/zod-types';
import {
	interpolate,
	useCurrentFrame,
	useVideoConfig
} from 'remotion';
import { z } from 'zod';
import { LogoMinimal } from './LogoMinimal';
import { Subtitle } from './Subtitle';
import { Title } from './Title';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	meetupUrl: z.string(),
});

export const Rsvp: React.FC<z.infer<typeof myCompSchema>> = ({
	titleColor,
	titleText,
	meetupUrl,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const textOpacity = interpolate(
		frame,
		[0, 20, durationInFrames - 20, durationInFrames],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);
	return (
		<div className="flex flex-col gap-8 items-center relative z-100">
			<LogoMinimal color={titleColor} />
			<Title
				titleText={titleText}
				titleColor={titleColor}
				titleOpacity={textOpacity}
				titleSize="text-6xl"
				titleOtherClasses="uppercase my-12"
			/>

			<Subtitle
				titleText={meetupUrl}
				titleOpacity={textOpacity}
				titleSize="text-5xl"
				titleColor={titleColor}
				titleWidth="w-full"
				titleUnderline="underline"
			/>
		</div>
	);
};
