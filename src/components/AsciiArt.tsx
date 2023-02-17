const GMS_LG = `        GGGGGGGGGGGGGMMMMMMMM               MMMMMMMM   SSSSSSSSSSSSSSS 
     GGG::::::::::::GM:::::::M             M:::::::M SS:::::::::::::::S
   GG:::::::::::::::GM::::::::M           M::::::::MS:::::SSSSSS::::::S
  G:::::GGGGGGGG::::GM:::::::::M         M:::::::::MS:::::S     SSSSSSS
 G:::::G       GGGGGGM::::::::::M       M::::::::::MS:::::S            
G:::::G              M:::::::::::M     M:::::::::::MS:::::S            
G:::::G              M:::::::M::::M   M::::M:::::::M S::::SSSS         
G:::::G    GGGGGGGGGGM::::::M M::::M M::::M M::::::M  SS::::::SSSSS    
G:::::G    G::::::::GM::::::M  M::::M::::M  M::::::M    SSS::::::::SS  
G:::::G    GGGGG::::GM::::::M   M:::::::M   M::::::M       SSSSSS::::S 
G:::::G        G::::GM::::::M    M:::::M    M::::::M            S:::::S
 G:::::G       G::::GM::::::M     MMMMM     M::::::M            S:::::S
  G:::::GGGGGGGG::::GM::::::M               M::::::MSSSSSSS     S:::::S
   GG:::::::::::::::GM::::::M               M::::::MS::::::SSSSSS:::::S
     GGG::::::GGG:::GM::::::M               M::::::MS:::::::::::::::SS 
        GGGGGG   GGGGMMMMMMMM               MMMMMMMM SSSSSSSSSSSSSSS`;

const GMS_MD = ` ██████╗ ███╗   ███╗███████╗
██╔════╝ ████╗ ████║██╔════╝
██║  ███╗██╔████╔██║███████╗
██║   ██║██║╚██╔╝██║╚════██║
╚██████╔╝██║ ╚═╝ ██║███████║
 ╚═════╝ ╚═╝     ╚═╝╚══════╝
`;

export function AsciiArt({ className }: { className: string }) {
  return <pre className={className}>{GMS_MD}</pre>;
}
