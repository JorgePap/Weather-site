interface Props {
  category?: string;
  effective?: string;
  expires?: string;
}

export const Warnings: React.FC<Props> = ({
  category = "Extreme high temperature",
  effective,
  expires,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg py-2 px-2 bg-black/25 hover:bg-black/[35%]">
      <h4 className="text-center">{category} warning</h4>
      <div className="text-center">
        from {effective} to {expires}
      </div>
    </div>
  );
};
