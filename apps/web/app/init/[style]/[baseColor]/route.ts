import { isBaseColor } from '@/registry/base-colors';
import { composeStyleItem, findStyle } from '@/registry/preset';

export const GET = async (
  _request: Request,
  context: RouteContext<'/init/[style]/[baseColor]'>
) => {
  const { baseColor, style: styleName } = await context.params;
  const style = findStyle(styleName);

  if (!(style && isBaseColor(baseColor))) {
    return new Response(null, { status: 404 });
  }

  return Response.json(composeStyleItem(style, baseColor));
};
